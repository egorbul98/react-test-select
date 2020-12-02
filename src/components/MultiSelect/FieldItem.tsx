import React from 'react';

type PropsType = {
  id:number
  title: string,
  onDel?:(id:number)=>void,
  onClick?:(id:number)=>void,
}
const FieldItem: React.FC<PropsType> = ({ id, title, onDel, onClick }) => {
  const onDelHandler = () => {
    onDel && onDel(id);
  }
  const onClickHandler = () => {
    onClick && onClick(id);
  }
  return (
    <div className="field-item" onClick={onClickHandler}>
      <div className="title">{title}</div>
      <div className="del" onClick={onDelHandler}>x</div>
    </div>
  );
}

export default React.memo(FieldItem);
