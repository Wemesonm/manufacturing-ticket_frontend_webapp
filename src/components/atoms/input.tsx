'use client';

import React from 'react';

import * as S from './input.styled';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Input(props: InputProps) {
  return <S.StyledInput {...props} />;
}

export function Select(props: SelectProps) {
  return <S.StyledSelect {...props} />;
}

export function TextArea(props: TextAreaProps) {
  return <S.StyledTextArea {...props} />;
}
