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
  trackData: any
  variantData: any
  genome: string
}) {
  const id = CSS.escape(useId())
  useEffect(() => {
    const r = new LibraryGenomeFeatureViewer(
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
      `#hello`,
      900,
      500,
    )
  }, [type, trackData, genome, region, id, variantData])

  return <svg id="hello"></svg>
}
