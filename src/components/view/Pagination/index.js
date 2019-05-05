import React from 'react';

import FlatButton from 'material-ui/FlatButton';

import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

export default (props) => {
    const {
        contacts,
        indexStart,
        pageSize,
        requestSearchByCriteriaIndexStart,
        totalCount,
    } = props;

    const style = {
        text: {
            fontWeight: 800,
        }
    };

    const indexEnd = indexStart + contacts.length;

    console.log('indexStart', indexStart);
    console.log('indexEnd', indexEnd);
    console.log('totalCount', totalCount);
    console.log('contacts.length', contacts.length);

    return (
        <div
            style={{
                position: 'absolute',
                bottom: '1.5em',
                left: '1em',
            }}
            >
            <FlatButton
                style={{
                    marginLeft: '1em',
                    marginRight: '1em',
                    minWidth: '2em',
                    // visibility change is delayed by Material UI
                    visibility: indexStart === 0 ? 'hidden' : 'visible',
                    // opacity change is tweened
                    opacity: indexStart === 0 ? 0 : 1,
                }}
                onClick={() => requestSearchByCriteriaIndexStart({ indexStart: indexStart - pageSize })}
                icon={<ArrowBackIcon />}
                />
            {contacts && totalCount > 0 && (
                <span>
                    Showing 
                    <span style={style.text}> {indexStart + 1} </span> - <span style={style.text}> {indexEnd} </span>
                     of <span style={style.text}>{totalCount}</span>
                </span>
            )}
            {totalCount === 0 && 'No Results'}
            <FlatButton
                style={{
                    marginLeft: '1em',
                    marginRight: '1em',
                    minWidth: '2em',
                    // visibility change is delayed by Material UI
                    visibility: indexEnd === totalCount ? 'hidden' : 'visible',
                    // opacity change is tweened
                    opacity: indexEnd === totalCount ? 0 : 1,
                }}
                onClick={() => requestSearchByCriteriaIndexStart({ indexStart: indexStart + pageSize })}
                icon={<ArrowForwardIcon />}
                />
            
        </div>
    );
};