import { useState, useEffect, useRef } from 'react';
import { PixiRef, Text } from "@pixi/react";
import { TextStyle } from 'pixi.js';

interface props {
    text : string;
    maxWidth: number;
    style: TextStyle;
    position: [number, number];
    anchor: number | [number, number]
}

// 동적 폰트 크기를 가진 텍스트 컴포넌트
export const AutosizeText = ({ text, maxWidth, style, position, anchor }: props) => {
  const [fontSize, setFontSize] = useState<string | number>(style.fontSize);
  const textRef = useRef<PixiRef<typeof Text>>(null);
  
  useEffect(() => {
    if (textRef.current) {
      const pixiText = textRef.current;
      
      const textWidth = pixiText.width;

      if (textWidth > maxWidth) {
        const ratio = maxWidth / textWidth;
        const newFontSize = Math.floor(Number(fontSize) * ratio);
        setFontSize(newFontSize);
      } else {
        setFontSize(style.fontSize);
      }
    }
  }, [text, maxWidth]);
  
  const adjustedStyle = new TextStyle({
    ...style,
    fontSize: fontSize
  });
  
  return (
    <Text 
      ref={textRef}
      text={text} 
      position={position} 
      style={adjustedStyle} 
      anchor={anchor} 
    />
  );
};