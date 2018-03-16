function decrease(stockCarambars, event = 0) {
  if (event === 0) {
    alert('pas de changement')
  }
  return stockCarambars - event
}

function increase(stockDragibus, event = 0) {
  if (event === 0){
    alert('not change')
  }
  return stockDragibus + event
}

function variation(stock, event) {
  if (event >= 0) {
    return increase(stock, Math.abs(event))
  }

  return decrease(stock, -event)
}




//tests
describe ("variation", function() {
  const alert = jest.spyOn(window, 'alert');

  describe ("diminution", function() {
    it ('est-ce que la fonction decrease est defini', () => {
      expect(decrease).toBeDefined()
    });

    it ('decrease retourne alert si pas de 2eme parametre', () => {
      decrease('')
      expect(alert).toHaveBeenCalledWith('pas de changement')
    });

    it ('decrease retire le parametre au stock de base et le return', () => {
      let result = decrease(1000, 100)
      let expected = 900
      expect(result).toEqual(expected)

      result = decrease(499, 50)
      expected = 449
      expect(result).toEqual(expected)

      // let initialValue = [1000, 450, 23876]
      // let expectedMinus100 = [900, 350, 23776]
      // let expectedMinus50 = [950, 400, 23826]
      //
      // initialValue.forEach((value, index) => {
      //   expect(decrease(value, 100)).toBe(expectedMinus100[index])
      // })
      //
      // initialValue.forEach((value, index) => {
      //   expect(decrease(value, 50)).toBe(expectedMinus50[index])
      // })
    });

  });

  describe ("augmentation", function() {
    it ('la fonction increase est-elle définie', () => {
      expect(increase).toBeDefined()
    });

    it ('increase retour alert si pas de 2eme parametre', () => {
      increase('')
      expect(alert).toHaveBeenCalledWith('not change')
    })

    it ('increase ajoute le second parametre au stock', () => {
      let result = increase(1000, 100)
      let expected = 1100
      expect(result).toEqual(expected)

      result = increase(499, 50)
      expected = 549
      expect(result).toEqual(expected)
    });

  });

  it ('la fonction variation est-elle definie', () => {
    expect(variation).toBeDefined()
  });

  it ('la fonction variation increment le stock si la valeur du 2eme parametre est positif', () => {
    const inc = increase
    increase = jest.fn().mockImplementation(inc)

    let result = variation(100, 20)
    let expected = 120
    expect(result).toBe(expected)
    expect(increase).toHaveBeenCalledWith(100, 20)

    increase = jest.fn().mockImplementation(inc)
    variation(100, -20)
    expect(increase).not.toHaveBeenCalled()

    increase = jest.fn().mockImplementation(inc)
    result = variation(100, 99)
    expected = 199
    expect(result).toBe(expected)
    expect(increase).toHaveBeenCalledWith(100, 99)

    increase = jest.fn().mockImplementation(inc)
    result = variation(100, 0)
    expected = 100
    expect(increase).toHaveBeenCalledWith(100, 0)
    expect(result).toBe(expected)

    increase = jest.fn().mockImplementation(inc)
    result = variation(100, -0)
    expected = 100
    expect(increase).toHaveBeenCalledWith(100, 0)
    expect(result).toBe(expected)
  });

  it ('la fonction variation decrement le stock si la valeur du 2eme parametre est negatif', () => {
    const dec = decrease
    decrease = jest.fn().mockImplementation(dec)

    let result = variation(100, -20)
    let expected = 80
    expect(decrease).toHaveBeenCalledWith(100, 20)
    expect(result).toBe(expected)

    decrease = jest.fn().mockImplementation(dec)
    variation(100, 20)
    expect(decrease).not.toHaveBeenCalled()

    decrease = jest.fn().mockImplementation(dec)
    result = variation(100, -50)
    expected = 50
    expect(decrease).toHaveBeenCalledWith(100, 50)
    expect(result).toBe(expected)

    decrease = jest.fn().mockImplementation(dec)
    variation(100, 0)
    expect(decrease).not.toHaveBeenCalled()

    decrease = jest.fn().mockImplementation(dec)
    variation(100, -0)
    expect(decrease).not.toHaveBeenCalled()
  })



});
