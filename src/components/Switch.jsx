import { Switch as ChakaraSwitch, FormControl, FormLabel } from "@chakra-ui/react"

export default function Switch({ id, label, isChecked, onChange, defaultChecked }) {
  return (
    <FormControl display="flex" alignItems="center" mb="4">
      <FormLabel htmlFor={id} mb="0">
        {label}
      </FormLabel>
      <ChakaraSwitch id={id} onChange={onChange} isChecked={isChecked} defaultChecked={defaultChecked} />
    </FormControl>
  )
}
