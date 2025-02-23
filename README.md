# react-genomefeatures

A React wrapper for the genomefeatures library
https://github.com/GMOD/genomefeatures

## Install

```
yarn add react-genomefeatures
```

## Usage

This example demonstrates using the fetchNCListData and fetchTabixVcfData
utility functions in a useEffect to get feature data and the feature rendering,
along with a select box showing that users can change the viewed region around

Currently requires manually specifying a unique divId, as internally
auto-generating a id with useId and or handle with useRef isn't working quite
yet...will be updated if figured out

```typescript
import {
  fetchNCListData,
  fetchTabixVcfData,
  parseLocString,
  GenomeFeatureViewer,
} from 'genomefeatures'
import { useEffect, useState } from 'react'

import 'genomefeatures/style.css'

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
        <Features
          divId="testing"
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

function Features({
  region,
  trackData,
  variantData,
  genome,
  type,
  divId,
}: {
  region: { chromosome: string; start: number; end: number }
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackData: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variantData: any
  genome: string
  divId: string
}) {
  useEffect(() => {
    new LibraryGenomeFeatureViewer(
      {
        region,
        genome,
        tracks: [
          {
            type,
            trackData,
            variantData,
          },
        ],
      },
      `#${divId}`,
      900,
      500,
    )
  }, [type, trackData, genome, divId, region, variantData])

  return <svg id={divId}></svg>
}

```

## Note

This is still a new library, feel free to add issues or feedback
