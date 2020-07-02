import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Title from "../Atoms/Title";
import Product from "../Molecules/Product";
import Filter from "../Organisms/Filter";

const StyledCatalogWrapper = styled.div`
  display: flex;
`;

const StyledProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledColumnRight = styled.div`
  width: 75%;
`;

class Catalog extends React.Component {
  state = {
    search: "",
    value: "",
  };

  searchingProduct = (event) => {
    this.setState({ search: event.target.value, value: event.target.value });
  };

  clearSearch = (event) => {
    event.preventDefault();
    this.setState({ search: "", value: "" });
  };

  filter = (event) => {
    this.setState({ search: event.target.value });
  };

  clearFilter = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { products } = this.props;
    const { search } = this.state;
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        product.manufacture.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    return (
      <>
        <Title>Catalog</Title>

        <StyledCatalogWrapper>
          <Filter
            searchFn={this.searchingProduct}
            clearFn={this.clearSearch}
            value={this.state.value}
            filterFn={this.filter}
          />
          <StyledColumnRight>
            <StyledProductsWrapper>
              {filteredProducts.map((item) => (
                <Product
                  image={item.image}
                  amount={item.amount}
                  name={item.name}
                  manufacture={item.manufacture}
                  key={item.id}
                />
              ))}
            </StyledProductsWrapper>
          </StyledColumnRight>
        </StyledCatalogWrapper>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productsState,
});

export default connect(mapStateToProps)(Catalog);