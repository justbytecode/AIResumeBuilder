import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  changeCustom,
  selectCustom,
} from "@/lib/redux/resumeSlice";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
  
} from "@/lib/redux/settingsSlice";
import { Form } from "./Form";
import { BulletListTextArea } from "./Form/InputGroup";
import { BulletListIconButton } from "./Form/IconButton";


export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const { descriptions } = custom;
  const form = "custom";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleCustomChange = (field: "descriptions", value: string[]) => {
    dispatch(changeCustom({ field, value }));
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <div className="bg-gray-900 text-white p-5 m-5 ">
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextArea
            label="Custom Textbox"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleCustomChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[7.7rem] top-[0.07rem]">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
      </div>
    </Form>
    </div>
  );
};