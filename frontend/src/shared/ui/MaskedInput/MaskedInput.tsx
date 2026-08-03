import { forwardRef } from "react";
import { IMaskMixin } from "react-imask";
import { Input } from "@/shared/ui/Input";

const StyledMaskedInput = IMaskMixin(({ inputRef, ...props }) => (
  <Input 
        {...props}
        ref={inputRef as React.Ref<HTMLInputElement>} 
  />
));

export const MaskedInput = forwardRef<HTMLInputElement, any>(
  (props, ref) => <StyledMaskedInput {...props} inputRef={ref} />
);

MaskedInput.displayName = "MaskedInput";