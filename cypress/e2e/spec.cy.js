beforeEach('Before Every Test', () => {
  // cy.intercept("GET", "https://api.realworld.io/api/tags", { fixture: 'tags.json' }).as("tags")
  cy.intercept({ method: 'Get', path: 'tags' }, { fixture: 'tags.json' }).as('tags');
  cy.loginToApplication();
});

describe('API Practice', () => {
  it('Verify correct request and response', () => {
    cy.intercept('POST', 'https://api.realworld.io/api/articles/').as('postArticles');
    cy.contains('New Article').click();
    cy.get('[formcontrolname="title"]').type('This is the tittle article');
    cy.get('[formcontrolname="description"]').type('This is the tittle article description');
    cy.get('[formcontrolname="body"]').type('This is the tittle article body');
    cy.contains('Publish Article').click();

    // cy.wait("@postArticles")
    // cy.get("@postArticles").then((xhr) => {
    //   console.log(xhr);
    //   expect(xhr.response.statusCode).to.equal(200)
    //   expect(xhr.request.body.article.body).to.equal("This is the tittle article body")
    //   expect(xhr.response.body.article.description).to.equal("This is the tittle article description")
    //   expect(xhr.response.body.article.title).to.equal("This is the tittle article")})

    //info: Better way to do this
    cy.wait('@postArticles').then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.request.body.article.body).to.equal('This is the tittle article body');
      expect(xhr.response.body.article.description).to.equal('This is the tittle article description');
      expect(xhr.response.body.article.title).to.equal('This is the tittle article');
    });
  });

  it('Intercepting and modifying the request and response', () => {
    cy.intercept('POST', '**/articles', (req) => {
      req.body.article.description = 'This is the tittle article description 2';
    }).as('postArticles');
    cy.contains('New Article').click();
    cy.get('[formcontrolname="title"]').type('This is the tittle article');
    cy.get('[formcontrolname="description"]').type('This is the tittle article description');
    cy.get('[formcontrolname="body"]').type('This is the tittle article body');
    cy.contains('Publish Article').click();

    //info: Better way to do this
    cy.wait('@postArticles').then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.request.body.article.body).to.equal('This is the tittle article body');
      expect(xhr.response.body.article.description).to.equal('This is the tittle article description 2');
      expect(xhr.response.body.article.title).to.equal('This is the tittle article');
    });
  });

  //info: stub = response
  it('verify popular tags are displayed', () => {
    cy.get('.tag-list').should('contain', 'cypress').and('contain', 'automation').and('contain', 'testing');
    // cy.get('.tag-list').should('have.length', '3')
  });
  //info: * = wildcard, any value
  it('verify global feed likes count', () => {
    cy.intercept('GET', 'https://api.realworld.io/api/articles/feed*', {
      articles: [],
      articlesCount: 0,
    });
    cy.intercept('GET', 'https://api.realworld.io/api/articles*', {
      fixture: 'articles.json',
    });

    cy.contains('Global Feed').click();
    cy.get('app-article-list button').then((heartList) => {
      expect(heartList[0]).to.contain('1');
      expect(heartList[1]).to.contain('5');
    });

    cy.fixture('articles.json').then((file) => {
      const articleLink = file.articles[1].slug;
      file.articles[1].favoritesCount = 6;
      cy.intercept('POST', 'https://api.realworld.io/api/articles/' + articleLink + '/favorite', file);
    });

    cy.get('app-article-list button').eq(1).click().should('contain', '6');
  });

  it.only('Delete a new article in a global feed', () => {
    const userCredentials = {
      user: {
        email: 'artem.bondar16@gmail.com',
        password: 'CypressTest1',
      },
    };
    const bodyRequest = {
      article: {
        taglist: [],
        title: 'Request from API by Ali Ahmad',
        description: 'Description',
        body: 'Angular is cool',
      },
    };

    cy.request('POST', 'https://conduit.productionready.io/api/users/login', userCredentials)
      .its('body')
      .then((body) => {
        const token = body.user.token;

        cy.request({
          url: 'https://conduit.productionready.io/api/articles',
          headers: { Authorization: 'Token ' + token },
          method: 'POST',
          body: bodyRequest,
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });
  });
});
