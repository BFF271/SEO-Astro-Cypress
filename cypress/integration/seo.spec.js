/// <reference types="cypress" />

describe("Basic Tags", () => {
	beforeEach(() => {
		cy.visit("localhost:3000")
	})

	it("sets the title", () => {
		cy.title().should('eq', 'Francis York Morgan')
	})

	it("sets the description", () => {
		cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Agent',
    );
	})

	it("sets canonical link", () => {
		cy.get('head link[rel="canonical"]').should(
			'have.attr',
			'href',
			'Zach',
		);
	})

	it("sets the basic Open Graph properties", () => {
		cy.get('head meta[property="og:title"]').should(
			'have.attr',
			'content',
			'Tinker Tailor Soldier Spy',
		)
		cy.get('head meta[property="og:type"]').should(
			'have.attr',
			'content',
			'book',
		)
		cy.get('head meta[property="og:image"]').should(
			'have.attr',
			'content',
			'https://user-images.githubusercontent.com/5182256/131216951-8f74f425-f775-463d-a11b-0e01ad9fce8d.png',
		)
		cy.get('head meta[property="og:url"]').should(
			'have.attr',
			'content',
			'smiley',
		)
	})

	it("sets the optional Open Graph properties", () => {
		cy.get('head meta[property="og:audio"]').should(
			'have.attr',
			'content',
			'audio_link',
		)
		cy.get('head meta[property="og:description"]').should(
			'have.attr',
			'content',
			'optional description',
		)
		cy.get('head meta[property="og:determiner"]').should(
			'have.attr',
			'content',
			'an',
		)
		cy.get('head meta[property="og:locale"]').should(
			'have.attr',
			'content',
			'de_DE',
		)
		cy.get('head meta[property="og:locale:alternate"]').should(
			'have.attr',
			'content',
			'en_US',
		)
		cy.get('head meta[property="og:site_name"]').should(
			'have.attr',
			'content',
			'test',
		)
		cy.get('head meta[property="og:video"]').should(
			'have.attr',
			'content',
			'video_url',
		)
	})
})

describe("index & follow combinations", () => {

	it("applies correct defaults", () => {
		cy.visit("localhost:3000")
		cy.get('head meta[name="robots"]').should(
			'have.attr',
			'content',
			'index,follow'
		)
	})

	it("sets noindex correctly", () => {
		cy.visit("localhost:3000/noindex")
		cy.get('head meta[name="robots"]').should(
			'have.attr',
			'content',
			'noindex,follow'
		)
	})

	it("sets both noindex & nofollow correctly", () => {
		cy.visit("localhost:3000/noindexAndNofollow")
		cy.get('head meta[name="robots"]').should(
			'have.attr',
			'content',
			'noindex,nofollow'
		)
	})

})

describe("Open Graph image tags", () => {

	it("sets secure_url property", () => {
		cy.visit("localhost:3000/ogImageTags")
		cy.get('head meta[property="og:image:secure_url"]').should(
			'have.attr',
			'content',
			'open_graph_image_secure_url'
		)
	})

	it("sets mime type property", () => {
		cy.visit("localhost:3000/ogImageTags")
		cy.get('head meta[property="og:image:type"]').should(
			'have.attr',
			'content',
			'open_graph_image_mime_type'
		)
	})
	
	it("sets mime width property", () => {
		cy.visit("localhost:3000/ogImageTags")
		cy.get('head meta[property="og:image:width"]').should(
			'have.attr',
			'content',
			'500'
		)
	})

	it("sets mime height property (when it's 0)", () => {
		cy.visit("localhost:3000/ogImageTags")
		cy.get('head meta[property="og:image:height"]').should(
			'have.attr',
			'content',
			'0'
		)
	})

	it("sets alt property", () => {
		cy.visit("localhost:3000/ogImageTags")
		cy.get('head meta[property="og:image:alt"]').should(
			'have.attr',
			'content',
			'open_graph_image_alt'
		)
	})

})

describe("Open Graph article tags", () => {

	it("sets published_time property", () => {
		cy.visit("localhost:3000/ogArticleTags")
		cy.get('head meta[property="article:published_time"]').should(
			'have.attr',
			'content',
			'2021-09-22'
		)
	})

	it("sets modified_time property", () => {
		cy.visit("localhost:3000/ogArticleTags")
		cy.get('head meta[property="article:modified_time"]').should(
			'have.attr',
			'content',
			'2021-09-22'
		)
	})

	it("sets expiration_time property", () => {
		cy.visit("localhost:3000/ogArticleTags")
		cy.get('head meta[property="article:expiration_time"]').should(
			'have.attr',
			'content',
			'2021-09-22'
		)
	})

	it("sets authors properties", () => {
		cy.visit("localhost:3000/ogArticleTags")
		cy.get('head meta[property="article:author"]')
		.should('have.length', 2)
		.then(tags => {
			expect(tags[0].content).to.equal("Smiley")
			expect(tags[1].content).to.equal("Control")
		});
	})

	it("sets section property", () => {
		cy.visit("localhost:3000/ogArticleTags")
		cy.get('head meta[property="article:section"]').should(
			'have.attr',
			'content',
			'Literature'
		)
	})

	it("sets tags properties", () => {
		cy.visit("localhost:3000/ogArticleTags")
		cy.get('head meta[property="article:tag"]')
		.should('have.length', 2)
		.then(tags => {
			expect(tags[0].content).to.equal("Spy fiction")
			expect(tags[1].content).to.equal("Thriller")
		});
	})

	it("doesn't set empty author array", () => {
		cy.visit("localhost:3000/ogArticleTagsEmtpyArray")
		cy.get('head meta[property="article:author"]')
		.should('have.length', 0)
	})

	it("doesn't set empty tag array", () => {
		cy.visit("localhost:3000/ogArticleTagsEmtpyArray")
		cy.get('head meta[property="article:tag"]')
		.should('have.length', 0)
	})
})

describe("Twitter tags", () => {
	it("sets twitter:card tag", () => {
		cy.visit("localhost:3000/twitterTags")
		cy.get('head meta[name="twitter:card"]').should(
			'have.attr',
			'content',
			'summary_large_image'
		)
	})

	it("sets twitter:site tag", () => {
		cy.visit("localhost:3000/twitterTags")
		cy.get('head meta[name="twitter:site"]').should(
			'have.attr',
			'content',
			'@astrodotbuild'
		)
	})

	it("sets twitter:creator tag", () => {
		cy.visit("localhost:3000/twitterTags")
		cy.get('head meta[name="twitter:creator"]').should(
			'have.attr',
			'content',
			'@astrodotbuild'
		)
	})
})