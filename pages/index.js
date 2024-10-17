import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";
import logo from '../src/logo.svg'; // Atualize o caminho se necessário
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductCard2 from '../src/productCard2'; // Atualize o caminho se necessário
import { supabase } from '../src/supabaseClient'; // Atualize o caminho se necessário


export default function Home() {
    const [ name, setName ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10);
      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({ name, description })
        .single();
      
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Layout title={"App"}>
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>Store Products</Navbar.Brand>
          <Nav>
            <Nav.Item>Created by Vinicius Zancheta</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        
        <hr />
        <h3>Current Database Items</h3>
        <Row xs={1} lg={3} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <ProductCard2 product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
    </Layout>
  );
}
