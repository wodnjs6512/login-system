import styled from '@emotion/styled';
import type { AppProps /*, AppContext */ } from 'next/app';
const PasswordComplexityInd = (props: AppProps & { strength: number }) => {
    return (
        <ComplexityIndWrapper strength={props.strength} className="row">
            비밀번호 강도 : <ComplexityCell />
            <ComplexityCell />
            <ComplexityCell />
        </ComplexityIndWrapper>
    );
};

const ComplexityIndWrapper = styled.div<CustomHTMLElement>`
    > div {
        background-color: rgba(40, 40, 40, 0.3);
        border-radius: 3px;
    }
    div:nth-child(1) {
        ${(props) => props.strength > 0 && 'background-color:orange;'}
        ${(props) => props.strength > 1 && 'background-color:yellow;'}
        ${(props) => props.strength > 2 && 'background-color:green;'}
    }
    div:nth-child(2) {
        ${(props) => props.strength > 1 && 'background-color:yellow;'}
        ${(props) => props.strength > 2 && 'background-color:green;'}
    }
    div:nth-child(3) {
        ${(props) => props.strength > 2 && 'background-color:green'}
    }
`;

const ComplexityCell = styled.div<CustomHTMLElement>`
    width: 100px;
    height: 10px;
    margin: 0 2px;
`;

export default PasswordComplexityInd;
