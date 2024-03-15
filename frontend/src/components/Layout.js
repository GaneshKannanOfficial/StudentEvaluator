import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TopNav from './TopNav';
import SideNav from './SideNav';

const Layout = ({ children }) => {
  return (
    <>
      <TopNav />
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">      
            <SideNav />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
