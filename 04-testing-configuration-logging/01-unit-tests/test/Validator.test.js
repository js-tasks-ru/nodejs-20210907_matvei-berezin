const Validator = require('../Validator');
const expect = require('chai').expect;

describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    const validator = new Validator({
      name: {
        type: 'string',
        min: 5,
        max: 10,
      },
      age: {
        type: 'number',
        min: 18,
        max: 27,
      },
    });

    it('allowable name missing age', () => {
      // const validator = new Validator({
      //   name: {
      //     type: 'string',
      //     min: 10,
      //     max: 20,
      //   },
      // });

      const errors = validator.validate({ name: 'Lalala' });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got undefined');
    });

    it('empty date object', () => {

      const errors = validator.validate({});

      expect(errors).to.have.length(2);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got undefined');
      expect(errors[1]).to.have.property('field').and.to.be.equal('age');
      expect(errors[1]).to.have.property('error').and.to.be.equal('expect number, got undefined');
    });

    it('missing name allowable age', () => {

      const errors = validator.validate({ age: 27 });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got undefined');
    });

    it('invalid type name and invalid type age', () => {

      const errors = validator.validate({ name: 10, age: '25' });

      expect(errors).to.have.length(2);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got number');
      expect(errors[1]).to.have.property('field').and.to.be.equal('age');
      expect(errors[1]).to.have.property('error').and.to.be.equal('expect number, got string');
    });

    it('allowable name invalid type age', () => {

      const errors = validator.validate({ name: 'Lahjg', age: '5' });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('age');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got string');
    });

    it('invalid type name allowable age', () => {

      const errors = validator.validate({ name: 5, age: 18 });

      expect(errors).to.have.length(1);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got number');
    });

    it('allowable name allowable age', () => {

      const errors = validator.validate({ name: 'aaaaa', age: 18 });

      expect(errors).to.have.length(0);
    });

    it('valid type short name and valid type little age', () => {

      const errors = validator.validate({ name: 'La', age: 5 });

      expect(errors).to.have.length(2);
      expect(errors[0]).to.have.property('field').and.to.be.equal('name');
      expect(errors[0]).to.have.property('error').and.to.be.equal('too short, expect 5, got 2');
      expect(errors[1]).to.have.property('field').and.to.be.equal('age');
      expect(errors[1]).to.have.property('error').and.to.be.equal('too little, expect 18, got 5');
    });

    //и т.д.

  });
});