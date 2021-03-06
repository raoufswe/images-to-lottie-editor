import baseLottie from "./assets/base.json"
import create from "zustand"
import { createTrackedSelector } from "react-tracked"
import { composeNewLayer, deleteLayer, updateOpacity, resizeAsset, getAsset, moveAsset, updateAnimation, updateFrameRate } from "./parser"

const useStore = create((set, get) => ({
  lottieFile: baseLottie,
  selectedLayer: null,
  selectedAsset: null,
  visibleLayers: baseLottie.layers,
  opacity: null,
  w: null,
  h: null,
  x: null,
  y: null,
  fr: null,
  setRemoteLottieFile: (lottieFile) => {
    lottieFile.layers = lottieFile.layers.map((layer) => ({ ...layer, refId: `refId-${layer.nm}-${new Date()}` }))
    set({ lottieFile, visibleLayers: lottieFile.layers })
  },
  setImage: (image, externalBase64) => {
    const lottieFile = composeNewLayer(get().lottieFile, { image, externalBase64 })
    set({ lottieFile, visibleLayers: lottieFile.layers })
  },
  setSelectedLayer: (selectedLayer) => {
    const selectedAsset = getAsset(get().lottieFile, selectedLayer.refId)
    set({
      selectedLayer,
      selectedAsset,
      ...(selectedAsset ? { w: selectedAsset.w, h: selectedAsset.h } : {}),
      x: selectedLayer.ks.a.k[0],
      y: selectedLayer.ks.a.k[1],
      opacity: selectedLayer.ks.o.k
    })
  },
  hideLayer: () => {
    set({
      visibleLayers: get().visibleLayers.filter((layer) => layer.refId !== get().selectedLayer?.refId)
    })
  },
  showLayer: () => {
    set({ visibleLayers: get().visibleLayers.concat(get().selectedLayer) })
  },
  isSelectedLayerVisible: () => {
    return get().visibleLayers.some((layer) => layer.refId === get().selectedLayer?.refId)
  },
  deleteLayer: () => {
    const lottieFile = deleteLayer(get().lottieFile, get().selectedLayer)
    set({ lottieFile, visibleLayers: lottieFile.layers, selectedLayer: null })
  },
  setOpacity: (opacity) => {
    const lottieFile = updateOpacity(get().lottieFile, get().selectedLayer, opacity)
    set({ opacity, lottieFile })
  },
  setAssetWidth: (w) => {
    const lottieFile = resizeAsset(get().lottieFile, get().selectedLayer, { w })
    set({ w, lottieFile })
  },
  setAssetHeight: (h) => {
    const lottieFile = resizeAsset(get().lottieFile, get().selectedLayer, { h })
    set({ h, lottieFile })
  },
  setAssetXPosition: (x) => {
    const lottieFile = moveAsset(get().lottieFile, get().selectedLayer, { x })
    set({ x, lottieFile })
  },
  setAssetYPosition: (y) => {
    const lottieFile = moveAsset(get().lottieFile, get().selectedLayer, { y })
    set({ y, lottieFile })
  },
  setAnimation: (index) => {
    const lottieFile = updateAnimation(get().lottieFile, get().selectedLayer, index)
    set({ lottieFile })
  },
  setFrameRate: (frameRate) => {
    const lottieFile = updateFrameRate(get().lottieFile, frameRate)
    set({ lottieFile })
  }
}))

const useTrackedStore = createTrackedSelector(useStore)

export default useTrackedStore
