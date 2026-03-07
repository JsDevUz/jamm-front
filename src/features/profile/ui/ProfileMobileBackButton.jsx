import styled from "styled-components";

const ProfileMobileBackButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  margin-right: 12px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

export default ProfileMobileBackButton;

