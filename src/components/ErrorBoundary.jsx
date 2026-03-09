import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { crashed:false }; }
  static getDerivedStateFromError() { return { crashed:true }; }
  componentDidCatch(err, info) { console.error("[Portfolio]", err, info.componentStack); }
  render() {
    if (this.state.crashed) return this.props.fallback || (
      <div className="wrap" style={{paddingTop:24,paddingBottom:24,color:"#787470",fontSize:"0.8rem"}}>
        ⚠ This section could not be displayed.
      </div>
    );
    return this.props.children;
  }
}

export default ErrorBoundary;
