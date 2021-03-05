export const composeNewLayer = (lottieFile, newImage) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile));
  return {
    ...cloned,
    assets: [
      ...cloned.assets,
      { id: newImage.name, w: 500, h: 500, u: "", p: newImage.base64, e: 1 },
    ],
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
                s: [100, 100, 0],
              },
              { t: 59.0000024031193, s: [100, 100, 100] },
            ],
            ix: 6,
          },
        },
        ao: 0,
        ip: 0,
        op: 60.0000024438501,
        st: 0,
        bm: 0,
      },
    ],
  };
};

export const bounceAnimation = {
  o: { a: 0, k: 100, ix: 11 },
  r: { a: 0, k: 0, ix: 10 },
  p: { a: 0, k: [450, 380, 400], ix: 2 },
  a: { a: 0, k: [402.391, 302.085, 0], ix: 2 },
  s: {
    a: 1,
    k: [
      {
        i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
        o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
        t: 0,
        s: [100, 100, 0],
      },
      {
        i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
        o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
        t: 15,
        s: [100, 50, 100],
      },
      {
        i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
        o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
        t: 30,
        s: [100, 100, 0],
      },
      { t: 59.0000024031193, s: [100, 100, 100] },
    ],
    ix: 6,
  },
};

export const appearAnimation = {
  ty: "tr",
  o: { k: 100 },
  r: { k: 0 },
  p: { k: [0, 0] },
  a: { k: [0, 0] },
  s: {
    a: 1,
    k: [
      {
        i: { x: [0.67, 0.67, 0.67], y: [1, 1, 1] },
        o: { x: [0.33, 0.33, 0.33], y: [0, 0, 0] },
        t: 0,
        s: [0, 0, 100],
      },
      {
        i: { x: [0.67, 0.67, 0.67], y: [1, 1, 1] },
        o: { x: [0.33, 0.33, 0.33], y: [0, 0, 0] },
        t: 34,
        s: [135, 135, 100],
      },
      {
        i: { x: [0.83, 0.83, 0.83], y: [1, 1, 1] },
        o: { x: [0.33, 0.33, 0.33], y: [0, 0, 0] },
        t: 45,
        s: [131, 131, 100],
      },
      { t: 50, s: [133, 133, 100] },
    ],
    ix: 6,
  },
  sk: { k: 0 },
  sa: { k: 0 },
};

export const rotateAnimation = {
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
        ti: [0, 2.38, 0],
      },
      {
        i: { x: 0.67, y: 1 },
        o: { x: 0.33, y: 0 },
        t: 37,
        s: [0, 384, 0],
        to: [0, -6.63, 0],
        ti: [0, -0.48, 0],
      },
      { t: 51, s: [0, 0, 0] },
    ],
    ix: 2,
    a: 1,
  },
  a: { k: [0, 0] },
  s: { k: [133.33, 133.33] },
  sk: { k: 0 },
  sa: { k: 0 },
};

export const animations = [bounceAnimation, appearAnimation, rotateAnimation];

export const deleteLayer = (lottieFile, selected_layer) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile));
  return {
    ...cloned,
    ...(cloned?.assets
      ? {
          assets: cloned.assets.filter(
            (asset) => asset.id !== selected_layer.nm
          ),
        }
      : {}),
    layers: cloned.layers.filter((layer) => layer.nm !== selected_layer.nm),
  };
};

export const updateOpacity = (lottieFile, selected_layer, opacity) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile));
  return {
    ...cloned,
    layers: [...cloned.layers].map((layer) => {
      if (layer.nm === selected_layer?.nm) layer.ks.o.k = opacity;
      return layer;
    }),
  };
};

export const resizeAsset = (lottieFile, selected_layer, { h, w }) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile));
  return {
    ...cloned,
    ...(cloned?.assets
      ? {
          assets: [...cloned.assets].map((asset) => {
            if (asset.id === selected_layer.nm) {
              asset.h = h ? h : asset.h;
              asset.w = w ? w : asset.w;
            }
            return asset;
          }),
        }
      : {}),
  };
};

export const moveAsset = (lottieFile, selected_layer, { x, y }) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile));
  return {
    ...cloned,
    layers: [...cloned.layers].map((layer) => {
      if (layer.nm === selected_layer?.nm) {
        layer.ks.a = {
          ...layer.ks.a,
          k: [
            x ? parseInt(x) : selected_layer.ks.a.k[0],
            y ? parseInt(y) : selected_layer.ks.a.k[1],
            0,
          ],
        };
      }
      return layer;
    }),
  };
};

export const getAsset = (lottieFile, id) => {
  return lottieFile.assets.find((asset) => asset.id === id);
};

export const updateAnimation = (lottieFile, selected_layer, index) => {
  let cloned = JSON.parse(JSON.stringify(lottieFile));
  return {
    ...cloned,
    layers: [...cloned.layers].map((layer) => {
      if (layer.nm === selected_layer?.nm) {
        layer.ks = animations[index];
        return layer;
      }
      return layer;
    }),
  };
};
