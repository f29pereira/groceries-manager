import * as React from "react";
import FallBack from "./FallBack";

/**
 * Renders fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    //update state to show fallback UI on next render
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      //render custom fallback UI
      return <FallBack />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
