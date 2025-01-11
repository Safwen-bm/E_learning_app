declare module "react-quill" {
    import { Component } from "react";
  
    export interface QuillEditorProps {
      value?: string;
      defaultValue?: string;
      theme?: string;
      onChange?: (content: string, delta: any, source: any, editor: any) => void;
      onFocus?: (range: any, source: any, editor: any) => void;
      onBlur?: (previousRange: any, source: any, editor: any) => void;
      placeholder?: string;
      modules?: Record<string, any>;
      formats?: string[];
      readOnly?: boolean;
      bounds?: string | HTMLElement;
      scrollingContainer?: string | HTMLElement;
      style?: React.CSSProperties;
      className?: string;
      tabIndex?: number;
    }
  
    export default class ReactQuill extends Component<QuillEditorProps> {}
  }
  