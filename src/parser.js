import genUuid from "uuid-random"

export const composeNewLayer = (lottieFile, { image, externalBase64 = "" }) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))
  const refId = `refId-${image.name}-${Date.now()}`
  const uuid = genUuid()
  return {
    ...cloned,
    assets: [
      ...cloned.assets,
      {
        id: refId,
        w: 500,
        h: 500,
        u: "",
        p: image?.base64 ?? externalBase64,
        e: 1,
        uuid
      }
    ],
    layers: [
      ...cloned.layers,
      {
        ddd: 0,
        ind: 1,
        ty: 2,
        nm: image.name,
        refId,
        uuid,
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { k: [0, 0] },
          a: { a: 0, k: [0, 0], ix: 2 },
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

const bounceAnimation = (totalTime,a) => ({
  o: { a: 0, k: 100, ix: 11 },
  r: { a: 0, k: 0, ix: 10 },
  p: { k: [0, 0] },
  a: a,
  s: {
    a: 1,
    k: [
      {
        i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
        o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
        t: 0,
        s: [100, 100, 100]
      },
      {
        i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
        o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
        t: (totalTime / 3) * 2,
        s: [100, 50, 100]
      },
      {
        i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
        o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
        t: totalTime,
        s: [100, 100, 100]
      },
      { t: totalTime, s: [100, 100, 100] }
    ],
    ix: 6
  }
})

const appearAnimation = (totalTime,a) => ({
  ty: "tr",
  o: { k: 100 },
  r: { k: 0 },
  p: { k: [0, 0] },
  a: a,
  s: {
    a: 1,
    k: [
      {
        i: { x: [0.67, 0.67, 0.67], y: [1, 1, 1] },
        o: { x: [0.33, 0.33, 0.33], y: [0, 0, 0] },
        t: 0,
        s: [0, 0, 100]
      },
      {
        i: { x: [0.67, 0.67, 0.67], y: [1, 1, 1] },
        o: { x: [0.33, 0.33, 0.33], y: [0, 0, 0] },
        t: (totalTime / 3) * 2,
        s: [100, 100, 100]
      },
      {
        i: { x: [0.83, 0.83, 0.83], y: [1, 1, 1] },
        o: { x: [0.33, 0.33, 0.33], y: [0, 0, 0] },
        t: totalTime,
        s: [100, 100, 100]
      },
      { t: totalTime * 2, s: [99, 99, 100] }
    ],
    ix: 6
  },
  sk: { k: 0 },
  sa: { k: 0 }
})

const rotateAnimation = (totalTime,a) => ({
  ty: "tr",
  o: { k: 100 },
  r: { k: 0 },
  p: {
    k: [
      {
        i: { x: 0.67, y: 1 },
        o: { x: 0.33, y: 0 },
        t: 0,
        s: [0, -512, 0],
        to: [0, -76.58, 0],
        ti: [0, 2.38, 0]
      },
      {
        i: { x: 0.67, y: 1 },
        o: { x: 0.33, y: 0 },
        t: totalTime,
        s: [0, 384, 0],
        to: [0, -6.63, 0],
        ti: [0, -0.48, 0]
      },
      { t: totalTime, s: [0, 0, 0] }
    ],
    ix: 2,
    a: 1
  },
  a: a,
  s: { k: [100, 100] },
  sk: { k: 0 },
  sa: { k: 0 }
})

export const animations = [
  { name: "Bounce", value: bounceAnimation },
  { name: "Appear", value: appearAnimation },
  { name: "Drop down", value: rotateAnimation },
  { name: "Default", value: (totalTime,a) => ({a}) }
]

export const deleteLayer = (lottieFile, selected_layer) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))
  if (cloned?.assets) cloned.assets = cloned.assets.filter((asset) => asset.id !== selected_layer.uuid)
  cloned.layers = cloned.layers.filter((layer) => layer.uuid !== selected_layer.uuid)
  return cloned
}

export const updateOpacity = (lottieFile, selected_layer, opacity) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))
  cloned.layers = [...cloned.layers].map((layer) => {
    if (layer.uuid === selected_layer?.uuid) layer.ks.o.k = opacity
    return layer
  })
  return cloned
}

export const resizeAsset = (lottieFile, selected_layer, { h, w }) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))
  if (cloned?.assets) {
    cloned.assets = [...cloned.assets].map((asset) => {
      if (asset.id === selected_layer.refId) {
        asset.h = h ? h : asset.h
        asset.w = w ? w : asset.w
      }
      return asset
    })
  }
  console.log(cloned?.assets)

  return cloned
}

export const moveAsset = (lottieFile, selected_layer, { x, y }) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))
  cloned.layers = [...cloned.layers].map((layer) => {
    if (layer.uuid === selected_layer.uuid && x !== '-' && y !== '-') {
      layer.ks.a = {
        ...layer.ks.a,
        k: [x ? parseFloat(x) : parseFloat(layer.ks.a.k[0]), y ? parseFloat(y) : parseFloat(layer.ks.a.k[1]), 0]
      }
    }
    return layer
  })

  return cloned
}

export const getAsset = (lottieFile, id) => {
  return lottieFile.assets.find((asset) => asset.id === id)
}

export const updateFrameRate = (lottieFile, newFrameRate) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))
  cloned.fr = parseFloat(newFrameRate)
  return cloned
}

export const updateAnimation = (lottieFile, selected_layer, index) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile))

  cloned.layers = [...cloned.layers].map((layer) => {
    if (layer.uuid === selected_layer?.uuid) {
      layer.ks = animations[index].value(lottieFile.op,layer.ks.a)
      return layer
    }
    return layer
  })

  return cloned
}
