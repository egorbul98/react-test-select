import React from 'react';

type PropsType = {
  id:number
  title: string,
  onDel?:(id:number)=>void
}
const FieldItem: React.FC<PropsType> = ({ id, title, onDel }) => {
  const onClickDelHandler = () => {
    onDel && onDel(id);
  }
  return (
    <div className="field-item">
      <div className="title">{title}</div>
      <div className="del" onClick={onClickDelHandler}>x</div>
    </div>
  );
}

export default FieldItem;
