import React, {useState} from 'react';
import classNames from 'classnames';
import Autocomplete from 'react-autocomplete';
import Option from './Option';
import FieldItem from './FieldItem';
import './multiSelect.css';
import Loading from '../Loading/Loading';
import {useCallback} from 'react';
type TOption = {
    id: number,
    label: string
}
type PropTypes = {
    options: Array < TOption >,
    isLoadingData?: boolean,
    multi?: boolean,
    onSelectOptionsItem?: (id : number) => void,
    onClick?: () => void,
    onClickOptions?: () => void,
    onDelOptions?: (id:number) => void,
    onDelFieldItems?: () => void
}
const MultiSelect : React.FC < PropTypes > = ({multi, options, isLoadingData, onSelectOptionsItem, onDelOptions}) => {
    const [valueFieldInput, setValueFieldInput] = useState('');
    const [open, setOpen] = useState(false);
    const [activeItems, setActiveItems] = useState < TOption[] > ([]);

    const optionsItems : TOption[] = React.useMemo(() => {
        if (multi) {
            return options.filter((option) => !activeItems.some((item) => item.id === option.id))
        } else {
            return options;
        }
    }, [options, activeItems, multi]);

    const onChangeFieldHandler = useCallback((e : any) => {
        setValueFieldInput(e.target.value)
    }, [setValueFieldInput])

    const onSelectFieldInAutoCompleteHandler = useCallback((value : string, item : any) => {
        setActiveItems([
            ...activeItems,
            item
        ]);
        setValueFieldInput("");
    }, [setValueFieldInput, setActiveItems, activeItems])

    const onDelFieldItem = useCallback((id : number) => {
        setActiveItems(activeItems.filter((item) => item.id !== id));
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

                        : <input type="text" value={activeItems.length ? activeItems[0].label : ""} readOnly/>
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
                                return <Option id={item.id} key={item.id} title={item.label} onClick={onSelectOption} onDel={onDelOptions}/>
                            })}
                        </div>
                : null
}

        </div>
    );
}

export default MultiSelect;
