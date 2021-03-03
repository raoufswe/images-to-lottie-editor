export const composeNewLayer = (lottieFile, newImage) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))
  return {
    ...cloned,
    assets: [...cloned.assets, { id: newImage.name, w: 500, h: 500, u: "", p: newImage.base64, e: 1 }],
    layers: [
      ...cloned.layers,
      {
        ddd: 0,
        ind: 1,
        ty: 2,
        nm: newImage.name,
        refId: newImage.name,
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [450, 380, 0], ix: 2 },
          a: { a: 0, k: [402.391, 302.085, 0], ix: 2 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 0,
                s: [100, 100, 0]
              },
              { t: 59.0000024031193, s: [100, 100, 100] }
            ],
            ix: 6
          }
        },
        ao: 0,
        ip: 0,
        op: 60.0000024438501,
        st: 0,
        bm: 0
      }
    ]
  }
}

export const deleteLayer = (lottieFile, selected_layer) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))
  return {
    ...cloned,
    ...(cloned?.assets ? { assets: cloned.assets.filter((asset) => asset.id !== selected_layer.nm) } : {}),
    layers: cloned.layers.filter((layer) => layer.nm !== selected_layer.nm)
  }
}

export const updateOpacity = (lottieFile, selected_layer, opacity) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))
  return {
    ...cloned,
    layers: [...cloned.layers].map((layer) => {
      if (layer.nm === selected_layer?.nm) layer.ks.o.k = opacity
      return layer
    })
  }
}

export const resizeAsset = (lottieFile, selected_layer, { h, w }) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))
  return {
    ...cloned,
    ...(cloned?.assets
      ? {
          assets: [...cloned.assets].map((asset) => {
            if (asset.id === selected_layer.nm) {
              asset.h = h ? h : asset.h
              asset.w = w ? w : asset.w
            }
            return asset
          })
        }
      : {})
  }
}

export const getAsset = (lottieFile, id) => {
  return lottieFile.assets.find((asset) => asset.id === id)
}
