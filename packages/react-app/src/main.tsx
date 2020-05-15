import React from 'react'
// import { assert } from '@0x/assert';
import { ABIS } from '@project/eth-app'

import * as S from './main.styled'

export const Main = (props: any) => {
  return (
    <S.Container>
      <h1>dApp Template</h1>
      <h1>{ABIS.Counter.contractName}</h1>
    </S.Container>
  )
}
