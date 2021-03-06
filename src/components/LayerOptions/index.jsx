import { Flex, Box, Divider } from "@chakra-ui/react"
import useStore from "../../store"
import NumberInput from "../NumberInput"
import Switch from "../Switch"
import Slider from "../Slider"
import AlertDialog from "../AlertDialog"
import AnimationsOptions from "../AnimationsOptions"

export default function LayerOptions() {
  const {
    opacity,
    w,
    h,
    x,
    y,
    selectedLayer,
    isSelectedLayerVisible,
    hideLayer,
    showLayer,
    selectedAsset,
    setOpacity,
    setAssetWidth,
    setAssetHeight,
    setAssetXPosition,
    setAssetYPosition,
    deleteLayer
  } = useStore()

  const isVisible = isSelectedLayerVisible()
  if (!selectedLayer) return null
  return (
    <Flex flexDir="column">
      <Switch
        id="isVisible"
        label="Layer visibility:"
        defaultChecked={true}
        isChecked={isVisible}
        onChange={({ target }) => (target.checked ? showLayer() : hideLayer())}
      />
      <Slider label="Opacity:" onChange={setOpacity} defaultValue={opacity} />
      {selectedAsset && (
        <>
          <NumberInput label="Width" name="w" defaultValue={selectedAsset.w} value={w} onChange={setAssetWidth} />
          <NumberInput label="Height" name="h" defaultValue={selectedAsset.h} value={h} onChange={setAssetHeight} />
          <NumberInput label="Position X" name="x" defaultValue={selectedLayer.ks.a.k[0]} value={x} onChange={setAssetXPosition} />
          <NumberInput label="Position Y" name="x" defaultValue={selectedLayer.ks.a.k[1]} onChange={setAssetYPosition} value={y} />
        </>
      )}
      <AnimationsOptions />
      <Box>
        <AlertDialog title="Delete layer" onDelete={deleteLayer} />
      </Box>
      <Divider my="4" />
    </Flex>
  )
}
