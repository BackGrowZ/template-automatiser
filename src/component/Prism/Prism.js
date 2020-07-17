import React from 'react'
import { Wrapper, Pre, LineNo } from './styles'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

export default function Prism(props) {
    const { children, code } = props
    let formatedCode
    
    if (!children && !code) {
        return null
    } else if (code){
        formatedCode = code
    } else if (children){
        formatedCode = children
    }
    const showCode = (code) =>
        <Wrapper>
            <Highlight {...defaultProps} code={code} language="jsx" theme={theme}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <Pre className={className} style={style}>
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                                <LineNo>{i + 1}</LineNo>
                                {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                            </div>
                        ))}
                    </Pre>
                )}
            </Highlight>
        </Wrapper>

    return showCode(formatedCode)
}
