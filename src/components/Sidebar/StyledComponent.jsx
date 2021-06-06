import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarLink = styled.div`
    display: flex;
    color: #777;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    list-style: none;
    border-left: 4px solid #D7D7D7;
    font-weight: bold;
    &:hover {
        background: #D3D3D3;
        border-left: 4px solid #fff;
        cursor: pointer;
    }
`;
export const SidebarLabel = styled.span`
    margin-left: 10px;
    font-size: 13px;
`;

export const DropdownLink = styled(NavLink)`
    height: 60px;
    padding-left: 2rem;
    display: flex;
    align-items: center;
    color: #444;
    &:hover {
        background: #D3D3D3;
        cursor: pointer;
        text-decoration: none;
        color: #f5f5f5
    }
`;

export const DropdownLinkIcon = styled.div`
    padding: 2px
    background: teal;
`;
