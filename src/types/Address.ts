export interface City {
  _id: string;
  text: string;
}

export interface Address {
  _id: string;
  text: string;
  desc: {
    phone: string;
    status: string;
    workTime: string;
  };
}
