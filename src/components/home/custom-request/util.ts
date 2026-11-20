export type StepUnion = "step_1" | "step_2" | "step_3";

export interface CustomRequestData {
  shape: string;
  filling: string;
  stackLevel: string;
  guestNum: string;
  colorPallete: string;
  allergies: string;
  textDescription: string;
  decorations: string;
  refPhoto: FileList | null;
  eventDate: string;
  occassion: string;
  name: string;
  phoneNumber: string;
  address: string;
}

export const DEFAULT_STATE: CustomRequestData = {
  shape: "",
  filling: "",
  stackLevel: "",
  guestNum: "",
  colorPallete: "",
  allergies: "",
  textDescription: "",
  decorations: "",
  refPhoto: null,
  eventDate: "",
  occassion: "",
  name: "",
  phoneNumber: "",
  address: "",
};

export const STORAGE_KEY = "custom_request";

export const STACK_LEVELS = [
  { id: "option_1", value: "1 ярус" },
  { id: "option_2", value: "2 яруса" },
  { id: "option_3", value: "3 яруса" },
];

export const COLOR_PALLATE = [
  { id: "option_1", value: "Нежная пастельная" },
  { id: "option_2", value: "Яркая и насыщенная" },
  { id: "option_3", value: "Нейтральная / натуральная" },
  { id: "option_4", value: "Монохромная (один цвет в разных оттенках)" },
  { id: "option_5", value: "Контрастная (сочетание нескольких цветов)" },
  { id: "option_6", value: "Пастельная с акцентными деталями" },
  { id: "option_7", value: "На усмотрение кондитера" },
];

export const FILLINGS_OPITON = [
  { name: "Мильфей", img_src: "/fillings-images/yagodno-bananovy-milfey.jpg" },
  { name: "Сникерс", img_src: "/fillings-images/snikers.jpg" },
  { name: "Красный бархат", img_src: "/fillings-images/krasny-barkhat.jpg" },
  { name: "Лаванда-черника", img_src: null },
  { name: "Рафаэлло", img_src: null },
  { name: "Груша-карамель", img_src: null },
];

export const getInitiState = (): CustomRequestData => {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
};

export const onStateChange = ({
  name,
  value,
}: {
  name: string;
  value: string | FileList | null;
}) => {
  const storedValue = localStorage.getItem(STORAGE_KEY);

  const currentState: CustomRequestData = storedValue ? JSON.parse(storedValue) : DEFAULT_STATE;

  // For now, we don't want to persist these fields
  if (name === "refPhoto" || name === "eventDate") return;

  const updatedState = {
    ...currentState,
    [name]: value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
};

export const clearStateStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const REQUIRED_FIELDS = {
  step_1: ["shape", "filling"],
  step_2: ["stackLevel", "guestNum", "colorPallete", "decorations", "textDescription", "allergies"],
  step_3: ["name", "phoneNumber", "address", "eventDate", "occassion"],
};

type CustomRequestKey = keyof CustomRequestData;

export const validateFields = ({
  step,
  customRequest,
}: {
  step: StepUnion;
  customRequest: CustomRequestData;
}) => {
  const undefinedFields: string[] = [];
  const phase = REQUIRED_FIELDS[step];

  const isAllFieldDefine = phase.every((filedName) => {
    const isDefine = Boolean(customRequest[filedName as CustomRequestKey]);
    if (!isDefine) {
      undefinedFields.push(filedName);
    }
    return isDefine;
  });

  return {
    fields: undefinedFields,
    isError: !isAllFieldDefine,
  };
};
