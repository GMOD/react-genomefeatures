import {
  fetchNCListData,
  fetchTabixVcfData,
  parseLocString,
} from 'genomefeatures'
import { useEffect, useMemo, useState } from 'react'

import GenomeFeatureViewer from './GenomeFeatureViewer'

const options = [
  '2L:130639..135911',
  '2R:23974973..23989002',
  '3R:22693140..22699809',
  '2R:23974972..23989001',
  '2R:18614210..18615018',
  'X:2023822..2043557',
]
const vcfTabixUrl =
  'https://s3.amazonaws.com/agrjbrowse/VCF/7.0.0/fly-latest.vcf.gz'
const ncListUrlTemplate =
  'https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/FlyBase/fruitfly/tracks/All_Genes/{refseq}/trackData.jsonz'
const genome = 'fly'

export default function App() {
  const [error, setError] = useState<unknown>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trackData, setTrackData] = useState<any>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [variantData, setVariantData] = useState<any>()
  const [choice, setChoice] = useState(options[0])
  const region = useMemo(() => parseLocString(choice), [choice])

  useEffect(() => {
    ;(async () => {
      try {
        const trackData = await fetchNCListData({
          region,
          urlTemplate: ncListUrlTemplate,
        })

        const variantData = await fetchTabixVcfData({
          url: vcfTabixUrl,
          region,
        })
        setVariantData(variantData)
        setTrackData(trackData)
      } catch (e) {
        console.error(e)
        setError(e)
      }
    })()
  }, [region])
  return (
    <div>
      <div>
        <select
          value={choice}
          onChange={event => setChoice(event.target.value)}
        >
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <div style={{ color: 'red' }}>{`${error}`}</div>
      ) : trackData && variantData ? (
        <GenomeFeatureViewer
          type="ISOFORM_AND_VARIANT"
          genome={genome}
          region={region}
          trackData={trackData}
          variantData={variantData}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
