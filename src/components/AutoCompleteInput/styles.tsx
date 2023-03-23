import React from 'react';

const styles = {
  mainWrapper: {
    background: '#666',
    minHeight: '100vh',
    paddingTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  } as React.CSSProperties,
  inputWrapper: {
    width: 600
  } as React.CSSProperties,
  input: {
    width: 'calc(100% - 10px)',
    height: 50,
    marginTop: 30
  } as React.CSSProperties,
  heading: {
    fontSize: 45,
    color: '#fff',
    marginBottom: 20
  } as React.CSSProperties,
  subHeading: {
    fontSize: 20,
    color: '#fff'
  } as React.CSSProperties,
}

export default styles