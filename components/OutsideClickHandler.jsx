import React, { createRef } from "react";

class OutsideClickHandler extends React.Component {
  wrapperRef = createRef();

  static defaultProps = {
    onOutsideClick: () => {},
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.props.onOutsideClick();
    }
  };

  render() {
    const { children, toggle } = this.props;

    return (
      <div onMouseDown={toggle} ref={this.wrapperRef}>
        {children}
      </div>
    );
  }
}

export default OutsideClickHandler;
