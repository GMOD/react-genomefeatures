import { GenomeFeatureViewer as LibraryGenomeFeatureViewer } from 'genomefeatures'

import { useEffect, useId } from 'react'

import 'genomefeatures/style.css'

export default function GenomeFeatureViewer({
  region,
  trackData,
  variantData,
  genome,
  type,
}: {
  region: { chromosome: string; start: number; end: number }
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackData: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variantData: any
  genome: string
}) {
  const r = useId()
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
      `#${CSS.escape(r)}`,
      900,
      500,
    )
  }, [type, trackData, genome, region, r, variantData])

  return <svg id={r}></svg>
}
