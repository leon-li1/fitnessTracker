import useSWR from 'swr';
import { useEffect } from 'react';
import styled from 'styled-components'
import { useUser } from '../utils/auth/useUser'
import axios from 'axios';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

export default function Home() {
  const { user, logout } = useUser();
  const { data, error } = useSWR(
    user ? ['/api/history', user.token] : null,
    fetcher
  )
  if(data) console.log(data);
  return <Title>My page</Title>
}
