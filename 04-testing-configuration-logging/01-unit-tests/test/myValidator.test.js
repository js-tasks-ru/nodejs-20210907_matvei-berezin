const Validator = require('../Validator');
const expect = require('chai').expect;

describe('testing-configuration-logging/unit-tests', () => {
   describe('myValidator', () => {
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

      const rules = validator.rules;

      const names = ['Alise', 'AliseHonor', 'Mia', '', [], 5, 18, 55, undefined, NaN, true,];
      const ages = [18, 27, 15, 30, 'ten', 'Mia', undefined, NaN, true,];

      for (const name of names) {
         for (const age of ages) {
            let checkTypeName = '';
            let checkValueName = '';
            if (typeof (name) !== rules.name.type || Number.isNaN(name)) {
               checkTypeName = 'invalid type name';
            } else {
               checkTypeName = 'allowable type name';
               if (name.length < rules.name.min) {
                  checkValueName = 'too shot name'
               } else if (name.length > rules.name.max) {
                  checkValueName = 'too long name';
               } else {
                  checkValueName = 'in range';
               }
            }

            let checkTypeAge = '';
            let checkValueAge = '';
            if (typeof (age) !== rules.age.type || Number.isNaN(age)) {
               checkTypeAge = 'invalid type age';
            } else {
               checkTypeAge = 'allowable type age';
               if (age < rules.age.min) {
                  checkValueAge = 'too little age'
               } else if (age > rules.age.max) {
                  checkValueAge = 'too big age';
               } else {
                  checkValueAge = 'in range';
               }
            }

            it(`${checkTypeName} ${checkValueName} "${name}" / ${checkTypeAge} ${checkValueAge} "${age}"`, () => {

               const errors = validator.validate({ name, age });
               const switchExpretion = `${checkTypeName} ${checkValueName} ${checkTypeAge} ${checkValueAge}`;

               switch (switchExpretion) {
                  case 'allowable type name in range allowable type age in range':
                     expect(errors).to.have.length(0);
                     break;

                  case 'allowable type name in range allowable type age too little age':
                     expect(errors).to.have.length(1);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('age');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`too little, expect ${rules.age.min}, got ${age}`);
                     break;

                  case 'allowable type name in range allowable type age too big age':
                     expect(errors).to.have.length(1);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('age');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`too big, expect ${rules.age.max}, got ${age}`);
                     break;

                  case 'allowable type name in range invalid type age':
                     expect(errors).to.have.length(1);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('age');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`expect ${rules.age.type}, got ${typeof (age)}`);
                     break;

                  case 'allowable type name too shot name allowable type age in range':
                     expect(errors).to.have.length(1);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('name');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`too short, expect ${rules.name.min}, got ${name.length}`);
                     break;

                  case 'allowable type name too shot name allowable type age too little age':
                     expect(errors).to.have.length(2);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('name');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`too short, expect ${rules.name.min}, got ${name.length}`);
                     expect(errors[1]).to.have.property('field').and.to.be.equal('age');
                     expect(errors[1]).to.have.property('error').and.to.be.equal(`too little, expect ${rules.age.min}, got ${age}`);
                     break;

                  case 'allowable type name too shot name allowable type age too big age':
                     expect(errors).to.have.length(2);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('name');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`too short, expect ${rules.name.min}, got ${name.length}`);
                     expect(errors[1]).to.have.property('field').and.to.be.equal('age');
                     expect(errors[1]).to.have.property('error').and.to.be.equal(`too big, expect ${rules.age.max}, got ${age}`);
                     break;

                  case 'allowable type name too shot name invalid type age':
                     expect(errors).to.have.length(2);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('name');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`too short, expect ${rules.name.min}, got ${name.length}`);
                     expect(errors[1]).to.have.property('field').and.to.be.equal('age');
                     expect(errors[1]).to.have.property('error').and.to.be.equal(`expect ${rules.age.type}, got ${typeof (age)}`);
                     break;

                  case 'invalid type name  allowable type age in range':
                     expect(errors).to.have.length(1);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('name');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`expect ${rules.name.type}, got ${typeof (name)}`);
                     break;

                  case 'invalid type name  allowable type age too little age':
                     expect(errors).to.have.length(2);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('name');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`expect ${rules.name.type}, got ${typeof (name)}`);
                     expect(errors[1]).to.have.property('field').and.to.be.equal('age');
                     expect(errors[1]).to.have.property('error').and.to.be.equal(`too little, expect ${rules.age.min}, got ${age}`);
                     break;

                  case 'invalid type name  allowable type age too big age':
                     expect(errors).to.have.length(2);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('name');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`expect ${rules.name.type}, got ${typeof (name)}`);
                     expect(errors[1]).to.have.property('field').and.to.be.equal('age');
                     expect(errors[1]).to.have.property('error').and.to.be.equal(`too big, expect ${rules.age.max}, got ${age}`);
                     break;

                  case 'invalid type name  invalid type age':
                     expect(errors).to.have.length(2);
                     expect(errors[0]).to.have.property('field').and.to.be.equal('name');
                     expect(errors[0]).to.have.property('error').and.to.be.equal(`expect ${rules.name.type}, got ${typeof (name)}`);
                     expect(errors[1]).to.have.property('field').and.to.be.equal('age');
                     expect(errors[1]).to.have.property('error').and.to.be.equal(`expect ${rules.age.type}, got ${typeof (age)}`);
                     break;
               }
            });
         }

         it('empty date object', () => {

            const errors = validator.validate({});

            expect(errors).to.have.length(2);
            expect(errors[0]).to.have.property('field').and.to.be.equal('name');
            expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got undefined');
            expect(errors[1]).to.have.property('field').and.to.be.equal('age');
            expect(errors[1]).to.have.property('error').and.to.be.equal('expect number, got undefined');
         });

         it('empty name allowable type age in range', () => {

            const errors = validator.validate({ age: 20 });

            expect(errors).to.have.length(1);
            expect(errors[0]).to.have.property('field').and.to.be.equal('name');
            expect(errors[0]).to.have.property('error').and.to.be.equal('expect string, got undefined');
         });

         it('allowable type name in range empty age', () => {

            const errors = validator.validate({ name: 'Алиса' });

            expect(errors).to.have.length(1);
            expect(errors[0]).to.have.property('field').and.to.be.equal('age');
            expect(errors[0]).to.have.property('error').and.to.be.equal('expect number, got undefined');
         });
      };


      beforeEach(() => { });
   });
});