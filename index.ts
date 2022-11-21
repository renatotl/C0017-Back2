// também podia ser ima interface aqui, mas iriamos remover o "="
type IPersonagem = {
  correr: () => void;
  andar: () => void;
  agachar: () => void;
  atirar: () => void;
  tomarDano: (dano: number) => void;
  morrer: () => void;
};
// minha interface está implementando IPersonagem como se fosse uma nova interface
interface ICT extends IPersonagem {
  desarmar: () => void;
}
/*
POdiamos ter feito assim, mas estamos seguindo o DRY "don't repeat yourself" não repita o code
interface ITR  {
  correr: () => void;
  andar: () => void;
  agachar: () => void;
  atirar: () => void;
  tomarDano: (dano: number) => void;
  morrer: () => void;
  armar: () => void;
}
*/
interface ITR extends IPersonagem {
  armar: () => void;
}

interface IPersonagemProps {
  vida: number;
  colete: number;
}
// o extends NÃO REMOVE métodos
interface ICTProps extends IPersonagemProps {
    // alem da voda e do colete ele pode ter o KIT

  kitDeDesarme: boolean;// com o kit ele leva meos tempo pra desarmar a bomba
}

interface ITRProps extends IPersonagemProps {
  // alem da voda e do colete ele pode ter o C4
  C4: boolean;// pode ou não ter a bomba
}

// implement para métodos e extends para propriedades

class Personagem implements IPersonagem {
  // poderia colocar vida, colete, estaVido direto na interface, mas lá eles ficariam PUBLICO. Quando colocamos PRIVADO é porque só vamos modificar isso dentro da class
  private vida: number;
  private colete: number;
  private estaVivo: boolean = true;

  // também funciona assim no constructor( vida: number, colete: number) {}
  constructor({ vida, colete }: IPersonagemProps) {
    this.vida = vida;
    // os parametros do constructor são do IPersonagemProps 
    // já os private vida em cima que recebe os parâmetros e só podem ser usados aqui dentro
    this.colete = colete;
  }
  // agora usamos a lógica de programação para de fato fazer as funções
  tomarDano(dano: number): void {
    this.vida = this.vida - dano;
    this.colete = this.colete - dano * 0.125;
    if (this.vida <= 0) {
      this.morrer();
    }
  }
  // podemos colocar o PRIVATE atrás de morrer para que morrer não seja uma opção, mas um resultado dentro da calss personagem
  morrer(): void {
    this.estaVivo = false;
  }
  correr(): void {
    if (this.estaVivo) {
      console.log("Correndo");
    } else {
      console.log("Spec");
    }
  }
  andar(): void {
    if (this.estaVivo) {
      console.log("Andando");
    } else {
      console.log("Spec");
    }
  }
  agachar(): void {
    if (this.estaVivo) {
      console.log("Agachado");
    } else {
      console.log("Spec");
    }
  }
  atirar(): void {
    if (this.estaVivo) {
      console.log("Só bala tensa");
    } else {
      console.log("Spec");
    }
  }
}

// CRIADO OS PERSONAGENS

// nosso CT recebe todos os metodos de Personagem e iplementar ICT
class CT extends Personagem implements ICT {
  // esse kit só pode ser usado aqui
  private temKitDeDesarme: boolean;

  // fizemos as props das propriedades abaixo/ a interface ICTProps
  // construindo as propriedades da class/ passando para a class e só assim consigo validar na função abaixo
  constructor({ vida, colete, kitDeDesarme }: ICTProps) {
    // foi necessário o super "CLASS DERIVADAS" 


    // ESTE SUPER REPRESENTA O CONSTRUTOR DA CLASS PAI
    // Personagem é a class PAI de CT
    // para cirar o personagem é necessário " vida, colete"
    // super quando tiver extend em uma class que tem constructor! Personagem tem contructor
    // 
    super({ vida, colete });
    this.temKitDeDesarme = kitDeDesarme;
  }
  desarmar(): void {
    if (this.temKitDeDesarme) {
      console.log("desarmando em 5 segundos");
    } else {
      console.log("Desarmando em 10 segundos");
    }
  }
}

class TR extends Personagem implements ITR {
  private temC4: boolean;

  constructor({ vida, colete, C4 }: ITRProps) {
    super({ vida, colete });
    this.temC4 = C4;
  }
  armar(): void {
    if (this.temC4) {
      console.log("plantando a bomba");
    } else {
      console.log("Baaah meu deixaram a c4 na base");
    }
  }
}

// ESSA É A PARTE QUE INSTANCIAMOS!
// essa class TR esta sendo criada agora no momento que temos o NEW
const tr1 = new TR({ vida: 100, colete: 100, C4: true });
const ct1 = new CT({ vida: 100, colete: 100, kitDeDesarme: false });
 //
tr1.tomarDano(50);
tr1.tomarDano(20);
tr1.andar();
tr1.armar();
ct1.desarmar();
