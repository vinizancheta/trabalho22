import logo from '../src/logo.svg'; // Atualize o caminho se necessário
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductCard from '../src/productCard'; // Atualize o caminho se necessário
import { supabase } from '../src/supabaseClient'; // Atualize o caminho se necessário
import Layout from "../components/Layout";
import { useUser } from '../lib/UserContext'; // Certifique-se de que o contexto do usuário está configurado
import { useRouter } from 'next/router';

function App() {
  const router = useRouter();
  const { user } = useUser(); // Obtém o usuário atual do contexto
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Verifica se o usuário está logado e se é o admin
    if (!user || user.email !== 'admin@admin.com') {
      router.push('/'); // Redireciona para a página inicial se não for admin
    } else {
      getProducts(); // Chama a função para obter produtos se for admin
    }
  }, [user, router]);

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

  const handleBack = () => {
    router.back(); // Volta para a página anterior
  };

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
          <Row>
            <Col xs={12} md={8}>
              <h3>Create Product For Supabase Database</h3>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <Button onClick={createProduct}>Create Product in Supabase DB</Button>
              <br /><br />
              <Button onClick={handleBack}>Voltar</Button> {/* Botão de voltar */}
            </Col>
          </Row>
          <hr />
          <h3>Current Database Items</h3>
          <Row xs={1} lg={3} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </>
    </Layout>
  );
}

export default App;
