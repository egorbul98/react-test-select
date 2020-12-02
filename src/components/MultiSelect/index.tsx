import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import Autocomplete from 'react-autocomplete';
import Option from './Option';
import FieldItem from './FieldItem';
import './multiSelect.css';
import Loading from '../Loading/Loading';
import Pagination from '../Pagination/Pagination';
import {useCallback} from 'react';
type TOption = {
    id: number,
    label: string
}
type PropTypes = {
    options: Array < TOption >,
    isLoadingData?: boolean,
    multi?: boolean,//мультиселект или просто селект
    onSelectOptionsItem?: (id : number) => void,
    onClick?: () => void,
    onClickOptions?: () => void,
    onDelOptions?: (id:number) => void,
    onDelFieldItems?: () => void
}

const perPage = 2;
const MultiSelect : React.FC < PropTypes > = ({multi, options, isLoadingData, onSelectOptionsItem, onDelOptions}) => {
    const [valueFieldInput, setValueFieldInput] = useState('');
    const [open, setOpen] = useState(false);
    const [activeItems, setActiveItems] = useState < TOption[] > ([]);
    const [currentPage, setCurrentPage] = useState(1);
    const optionsFilterItems : TOption[] = React.useMemo(() => { //Берем только те опции, которые еще не выбраны
        if (multi) {
            return options.filter((option) => !activeItems.some((item) => item.id === option.id))
        } else {
            return options;
        }
    }, [options, activeItems, multi]);

    const lastIndexItemPage = perPage * currentPage;
    const firstIndexItemPage = lastIndexItemPage - perPage;
    const optionsItems = optionsFilterItems.slice(firstIndexItemPage, lastIndexItemPage);
   
    
    const onChangePage = useCallback((numPage: number) => {
        setCurrentPage(numPage);
    }, [setValueFieldInput])

    const onChangeFieldHandler = useCallback((e : any) => {
        setValueFieldInput(e.target.value)
    }, [setValueFieldInput])

    const onSelectFieldInAutoCompleteHandler = useCallback((value : string, item : any) => {
        setActiveItems([ ...activeItems, item ]);
        setValueFieldInput("");
    }, [setValueFieldInput, setActiveItems, activeItems])

    const onDelFieldItem = useCallback((id : number) => {
        setActiveItems(activeItems.filter((item) => item.id !== id));
    }, [setActiveItems, activeItems]);

    
    const onDelOptionHandle = useCallback((id: number) => {
        onDelOptions && onDelOptions(id);
        setCurrentPage(1);
        !multi && activeItems[0].id === id && setActiveItems([]);//Если обычный селект, и мы удаляем активную опцию, то очищаем эту опцию из инпута
    }, [setActiveItems, activeItems]);

    const onSelectOption = useCallback((id: number) => {
        if (multi) {
            setActiveItems([ ...activeItems, options.filter((item) => item.id === id)[0] ])
        } else {
          setActiveItems([options.filter((item) => item.id === id)[0]]);
        }
        onSelectOptionsItem && onSelectOptionsItem(id);
    }, [onSelectOptionsItem, setActiveItems, activeItems, options, multi])

    const onToggleOpen = useCallback((e : any) => {
        if (!multi && (e.target.classList.contains("field-wrap") || e.target.closest(".field-wrap")) || (e.target.classList.contains("open-btn"))) {
            setOpen(!open)
        }
    }, [multi, setOpen, open]);

    return (
        <div className={classNames("select-total", {"multi-select": multi})}>
            <div className="top">
                <div className="field-wrap" onClick={onToggleOpen}>
                    {multi
                        ? <Autocomplete
                                getItemValue={(item) => item.label}
                                items={optionsItems}
                                renderItem={(item, isHighlighted) => (
                                <div
                                    key={item.id}
                                    style={{
                                    background: isHighlighted ? 'lightgray' : 'white'
                                }}>
                                    {item.label + " " + item.id}
                                </div>
                            )}
                                autoHighlight={true}
                                value={valueFieldInput}
                                onChange={onChangeFieldHandler}
                                onSelect={onSelectFieldInAutoCompleteHandler}
                        />

                        : <input type="text" className="simple-input" value={activeItems.length ? activeItems[0].label : ""} readOnly/>
}

                    <div
                        className={classNames("open-btn", {"active": open})}
                        onClick={onToggleOpen}></div>
                </div>

                {multi && <div className="field-list">
                    {activeItems.map((item) => <FieldItem
                        key={item.id}
                        id={item.id}
                        title={item.label}
                        onDel={onDelFieldItem}/>)}
                </div>}

            </div>

            {open
                ? isLoadingData
                    ? <Loading/>
                    : <div className="list-options">
                            {optionsItems.map((item) => {
                                return <Option id={item.id} key={item.id} title={item.label} onClick={onSelectOption} onDel={onDelOptionHandle}/>
                            })}
                        <Pagination countItems={ optionsFilterItems.length} perPage={perPage}  currentPage={currentPage} onClickItem={onChangePage} />
                            
                        </div>
                : null
            }

            
            

        </div>
    );
}

export default MultiSelect;
