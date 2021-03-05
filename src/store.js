import testLottie from "./assets/among-us.json";
import create from "zustand";
import { createTrackedSelector } from "react-tracked";
import {
  composeNewLayer,
  deleteLayer,
  updateOpacity,
  resizeAsset,
  getAsset,
  moveAsset,
  updateAnimation,
  updateFrameRate,
} from "./parser";

const useStore = create((set, get) => ({
  lottieFile: testLottie,
  selectedLayer: null,
  selectedAsset: null,
  visibleLayers: testLottie.layers,
  opacity: null,
  w: null,
  h: null,
  x: null,
  y: null,
  fr: null,
  setImage: (image) => {
    const lottieFile = composeNewLayer(get().lottieFile, image);
    set({ lottieFile });
  },
  setSelectedLayer: (selectedLayer) => {
    const selectedAsset = getAsset(get().lottieFile, selectedLayer.nm);
    set({
      selectedLayer,
      selectedAsset,
      ...(selectedAsset ? { w: selectedAsset.w, h: selectedAsset.h } : {}),
      x: selectedLayer.ks.a.k[0],
      y: selectedLayer.ks.a.k[1],
      opacity: selectedLayer.ks.o.k,
    });
  },
  hideLayer: () => {
    set({
      visibleLayers: get().visibleLayers.filter(
        (layer) => layer.nm !== get().selectedLayer?.nm
      ),
    });
  },
  showLayer: () => {
    set({ visibleLayers: get().visibleLayers.concat(get().selectedLayer) });
  },
  isSelectedLayerVisible: () => {
    return get().visibleLayers.some(
      (layer) => layer.nm === get().selectedLayer?.nm
    );
  },
  deleteLayer: () => {
    const lottieFile = deleteLayer(get().lottieFile, get().selectedLayer);
    set({ lottieFile });
  },
  setOpacity: (opacity) => {
    const lottieFile = updateOpacity(
      get().lottieFile,
      get().selectedLayer,
      opacity
    );
    set({ opacity, lottieFile });
  },
  setAssetWidth: (w) => {
    const lottieFile = resizeAsset(get().lottieFile, get().selectedLayer, {
      w,
    });
    set({ w, lottieFile });
  },
  setAssetHeight: (h) => {
    const lottieFile = resizeAsset(get().lottieFile, get().selectedLayer, {
      h,
    });
    set({ h, lottieFile });
  },
  setAssetXPosition: (x) => {
    const lottieFile = moveAsset(get().lottieFile, get().selectedLayer, { x });
    set({ x, lottieFile });
  },
  setAssetYPosition: (y) => {
    const lottieFile = moveAsset(get().lottieFile, get().selectedLayer, { y });
    set({ y, lottieFile });
  },
  setAnimation: (index) => {
    const lottieFile = updateAnimation(
      get().lottieFile,
      get().selectedLayer,
      index
    );
    set({ lottieFile });
  },
  setFrameRate: (frameRate) => {
    const lottieFile = updateFrameRate(get().lottieFile, frameRate);
    set({ lottieFile });
  },
}));

const useTrackedStore = createTrackedSelector(useStore);

export default useTrackedStore;
