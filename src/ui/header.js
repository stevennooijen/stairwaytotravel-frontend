import React from 'react'
import styled from 'react-emotion'

const Header = ({ className, text }) => <h1 className={className}>{text}</h1>

export const PinkHeader = styled(Header)({
  color: 'hotpink',
})
