describe('login scneario', () => {
  it('passes', () => {
    cy.visit('https://recruitment-staging-queenbee.paradev.io/')
    cy.contains('button', 'Izinkan semua cookies').click()
    cy.get('svg[width="45"][height="46"][style*="cursor: pointer"]').click()

    cy.on('uncaught:exception', (err, runnable) => {
    // Ignore 401 errors specifically
    if (err.message.includes('Request failed with status code 401')) {
      return false
    }
    })

    cy.contains('a', 'Masuk').click()

    Cypress.on('uncaught:exception', (err, runnable) => {
      // Ignore specific error
      if (err.message.includes("Cannot read properties of null (reading 'clientHeight')")) {
        return false
      }

      // Or ignore all uncaught exceptions
      return false
    })

    cy.get('input[name="phone"]').type('12345678910')
    cy.get('input[name="password"]').type('Password1234!')
    cy.get('#page-login__button-login').click()

    cy.get('#chakra-modal--body-6 .css-acwcvw').should('have.text', 'Kamu perlu mengisi dan memilih alamat penerima untuk melihat stok produk.')

    cy.get('body').then(($body) => {
    if ($body.find('a:contains("Isi Alamat")').length > 0) {
      // Element exists
        cy.contains('a', 'Isi Alamat')
        .should('be.visible')
        .then(() => {
          // Do something if visible
        cy.contains('a', 'Isi Alamat').click()
        
        cy.get('.styles_modal-body__container-list__gPpUE').should('exist').scrollTo('bottom') // scrolls to bottom

        cy.wait(2000)
        cy.contains('button', 'Alamat Baru').click({ force: true })

        cy.get('input[id="add-address__label-text"]').type('Home Putri')
        cy.get('input[id="add-address__receiver-name"]').type('Putri')
        cy.get('input[id="add-address__receiver-number"]').type('12345678910')
        cy.get('#react-select-2-placeholder').click({ force: true })
        cy.get('input[id="react-select-2-input"]').type('Jawa Barat{enter}')
        cy.get('#react-select-3-placeholder').click({ force: true })
        cy.get('input[id="react-select-3-input"]').type('Depok{enter}')
        cy.get('#react-select-4-placeholder').click({ force: true })
        cy.get('input[id="react-select-4-input"]').type('Cimanggis{enter}')
        cy.get('#react-select-5-placeholder').click({ force: true })
        cy.get('input[id="react-select-5-input"]').type('Tugu{enter}')
        cy.get('textarea[id="add-address__receiver-full-address"]').type('Alamat Testing 123')
        cy.contains('button', 'Simpan Alamat').click()
        })
      } else {
        // Element does NOT exist
        cy.get('.styles_modal-body__container-list__gPpUE', { ensureScrollable: false }).scrollTo('bottom');
        cy.get('.chakra-button').eq(1).should('be.visible').click()
      }
    })
  })
})