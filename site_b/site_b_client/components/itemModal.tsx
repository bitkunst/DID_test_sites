import Image from 'next/image';
import { IFarmMachinery } from '../data/data';
import { useContext, useEffect, useState } from 'react';
import {
  Btn,
  BtnContainer,
  DIDPointList,
  DIDPointTitle,
  DIDPointWrap,
  ModalAlert,
  ModalBg,
  ModalImgWrap,
  ModalItemDesc,
  ModalItemInfo,
  ModalItemTitle,
  ModalPurchase,
  PointInput,
  PointTitle,
  PointWrap,
  Price,
  PriceUnit,
  PriceWrap,
  PurchaseTitle,
} from '../styles/modal/modal';
import { Global } from '../pages/_app';
import useValues from '../hooks/useValues';
import axios from 'axios';
import checkPoint from '../pages/api/checkPoint';

interface IItemModalProps {
  item: IFarmMachinery;
  closeModal: () => void;
}

export interface IDIDpoint {
  a_idx: number;
  name: string;
  pt: number;
}

const tmp: IDIDpoint[] = [
  { a_idx: 1, name: 'carrot', pt: 200000 },
  { a_idx: 2, name: 'egg plant', pt: 300000 },
  { a_idx: 3, name: 'cucumber', pt: 400000 },
];

const ItemModal = ({ item, closeModal }: IItemModalProps) => {
  const [DIDpoint, setDIDpoint] = useState<IDIDpoint[]>([]);
  const { userData } = useContext(Global);

  const { values, controllValues, errors, controllPurchase } = useValues(
    item.price,
    DIDpoint
  );

  useEffect(() => {
    (async () => {
      if (!userData) return;
      const result = await checkPoint(userData.userCode);
      if (!result) {
        alert('잠시후에 다시 시도해주세요.');
      } else {
        setDIDpoint(result);
      }
    })();
  }, []);

  const renderDIDpoint = () => {
    return DIDpoint.map((v) => {
      return (
        <li key={v.a_idx}>
          <DIDPointList>
            <PointTitle>
              {v.name} 포인트 : {v.pt} pt
            </PointTitle>
            <PointInput name={v.a_idx.toString()} onChange={controllValues} />
            <span style={{ color: 'red' }}>{errors[v.name]}</span>
          </DIDPointList>
        </li>
      );
    });
  };

  console.log(values);

  return (
    <ModalBg>
      <ModalAlert>
        <ModalItemInfo>
          <ModalImgWrap>
            <Image alt="제품이미지" src={item.img} layout="fill"></Image>
          </ModalImgWrap>
          <ModalItemTitle>{item.name}</ModalItemTitle>
          <ModalItemDesc>{item.desc}</ModalItemDesc>
        </ModalItemInfo>
        <ModalPurchase>
          <PurchaseTitle>구매</PurchaseTitle>
          <PriceWrap>
            <Price>{item.price}</Price>
            <PriceUnit>원 /월</PriceUnit>
          </PriceWrap>
          <PointWrap>
            <PointTitle>현재 포인트 : {userData?.pt} pt</PointTitle>
            <PointInput name="local" onChange={controllValues} />
            <span style={{ color: 'red' }}>{errors.error}</span>
          </PointWrap>
          <DIDPointTitle>DID Point</DIDPointTitle>
          <DIDPointWrap>{renderDIDpoint()}</DIDPointWrap>
          <BtnContainer>
            <Btn onClick={closeModal} bgc="#db5248">
              취소
            </Btn>
            <Btn bgc="#3fb569" onClick={controllPurchase}>
              구매
            </Btn>
          </BtnContainer>
        </ModalPurchase>
      </ModalAlert>
    </ModalBg>
  );
};

export default ItemModal;
