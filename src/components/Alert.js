let AlertRef;
export const setAlertRef = (ref) => {
  AlertRef = ref;
};

export const DropAlert = (type, title, message) =>
  AlertRef.current.alertWithType(type, title, message);
