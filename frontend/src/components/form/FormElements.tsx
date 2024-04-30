import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25vw; // Adjust based on your layout needs
  margin: 0 auto;
`;

export const InputWrap = styled.div`
  margin-top: 24px;
`;

export const FormInput = styled.input`
  width: 100%;
  height: 5.5vh;
  background-color: #ffffff;
  border: 1px solid #e0dee3;
  border-radius: 12px;
  margin-top: 12px;
  padding: 16px;
  font-size: 16px;

  &:focus {
    border-color: #b98ce0;
    outline: none;
  }

  &::placeholder {
    color: #756982;
    font-size: 16px;
  }
`;

export const FormLabel = styled.label`
  font-size: 16px;
  display: block;
  text-align: left;
`;

export const InformText = styled.span`
  font-size: 14px;
  color: #756982;
  margin-top: 6px;
  display: block;
`;

export const FormButton = styled.button`
  width: 100%; // Default full width to container
  height: 40px;
  min-width: 230px;
  margin-top: 36px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background-color: #b88cde; // Default color
  border-radius: 20px;
  border: none;

  &:hover {
    background-color: #b98ce0;
  }
`;

// Optional: Use this to wrap terms or additional text
export const TermsText = styled.span`
  display: block;
  margin-top: 20px;
  font-size: 14px;
  color: #756982;
  text-align: center;
  width: 100%;
`;

export const LinkText = styled.a`
  font-weight: bold;
  color: #756982;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

export const Bold = styled.strong`
  font-weight: bold;
`;
