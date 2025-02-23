import { GenomeFeatureViewer as LibraryGenomeFeatureViewer } from 'genomefeatures'

import { useEffect } from 'react'

import 'genomefeatures/style.css'

export default function GenomeFeatureViewer({
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
