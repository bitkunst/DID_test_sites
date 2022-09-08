import { ChangeEvent, useEffect, useState } from 'react';
import { IDIDpoint } from '../components/itemModal';

interface IErrors {
  [key: string]: string;
}

const useValues = (price: number, DIDpoint: IDIDpoint[]) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState<IErrors>({});
  const [isPurchase, setIsPurchase] = useState<boolean>(false);

  const controllValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validation = () => {
    const newErrors: IErrors = {};

    const valueArr: number[] = Object.values(values);

    const entryArr = Object.entries(values);

    const sumPrice = valueArr.reduce((acc, cur) => {
      return Number(acc) + Number(cur);
    }, 0);

    valueArr.forEach((v) => {
      if (isNaN(Number(v))) {
        newErrors.error = '숫자만 입력 가능합니다.';
      }
    });

    if (sumPrice !== price) {
      newErrors.error = '포인트의 합이 물품 가격과 일치하지 않습니다.';
    }

    entryArr.forEach((v) => {
      const [matched] = DIDpoint.filter((did) => did.a_idx === Number(v[0]));
      if (matched && matched.pt < Number(v[1])) {
        newErrors[matched.name] = '보유 중인 포인트를 확인해주세요.';
      }
    });

    setErrors(newErrors);
  };

  const controllPurchase = () => {
    setIsPurchase(true);
    validation();
  };

  useEffect(() => {
    if (!isPurchase) return;

    if (Object.keys(errors).length) return;

    // TODO: 구매 라우터 요청/응답

    console.log('구매성공!!');
  }, [errors]);

  return { values, controllValues, errors, controllPurchase };
};

export default useValues;
