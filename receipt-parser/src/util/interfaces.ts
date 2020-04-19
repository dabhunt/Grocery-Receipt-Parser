export default interface Questionnaire {
    title: string;
    description: string;
    questions: QuestionInterface[];
    is_open?: boolean;
    created_by?: string;
    date_added?: string;
    id?: number;
    order?: string;
}

export interface Food {
    //non-branded type, ex: 'Bread'
    foodType: string;
    //how it is reffered to on a grocery receipt
    code: string;
    quantity: number;
    price: number;
    date_added: string;
    id: number;
}
export interface Receipt {
    purchase_Date: Date;
    foods: Food[];
}

export interface Pantry {
    foods: Food[];
}
export interface ServerQuestionnaireResponse {
    id: number
    title: string
    description: string
    date_added: string
    is_open: boolean
    order: string
    created_by: string
}
export interface QuestionInterface {
    id?: number;
    title: string;
    type: QuestionType;
    options: string[];
    is_required: boolean;
    description: string;
    exclusionSets?: ExclusionCriteria[];
}

export interface ExclusionCriteria {
    name: string;
    exclusionCriteria: QuestionSelection[];
}

export interface QuestionSelection {
    name: string;
    selected: boolean;
    text: string;
}

export interface QuestionAnswer {
    questionId: number;
    answerSet: QuestionSelection[];
    id?: number;
}

export interface QuestionnaireResponse {
    id: number;
    answers: QuestionAnswer[];
}

export const EMPTY_QUESTION: QuestionInterface = {
    title: '',
    type: 'short-answer',
    options: [],
    is_required: true,
    description: '',
    exclusionSets: [],
};

export type QuestionType = 'checkbox' | 'radio' | 'short-answer' | 'long-answer' | 'range';
