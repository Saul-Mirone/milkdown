import {
    makeBlockMathInputRule,
    makeInlineMathInputRule,
    REGEX_BLOCK_MATH_DOLLARS,
    REGEX_INLINE_MATH_DOLLARS,
} from '@benrbray/prosemirror-math';
import { Node, NodeParserSpec, NodeSerializerSpec } from '@milkdown/core';
import type { InputRule } from 'prosemirror-inputrules';
import type { NodeSpec, NodeType } from 'prosemirror-model';

export class MathInline extends Node {
    override id = 'math_inline';
    override schema: NodeSpec = {
        group: 'inline math',
        content: 'text*',
        inline: true,
        atom: true,
        parseDOM: [{ tag: 'math-inline' }],
        toDOM: () => ['math-inline', { class: 'math-node' }, 0],
    };
    override parser: NodeParserSpec = {
        match: (node) => node.type === 'inlineMath',
        runner: (state, node, type) => {
            state.openNode(type);
            state.addText(node.value as string);
            state.closeNode();
        },
    };
    override serializer: NodeSerializerSpec = {
        match: (node) => node.type.name === this.id,
        runner: (state, node) => {
            let text = '';
            node.forEach((n) => {
                text += n.text as string;
            });
            state.addNode('inlineMath', undefined, text);
        },
    };
    override inputRules = (nodeType: NodeType): InputRule[] => [
        makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS, nodeType),
    ];
}

export class MathDisplay extends Node {
    override id = 'math_display';
    override schema: NodeSpec = {
        group: 'block math',
        content: 'text*',
        atom: true,
        code: true,
        parseDOM: [{ tag: 'math-display' }],
        toDOM: () => ['math-display', { class: 'math-node' }, 0],
    };
    override parser: NodeParserSpec = {
        match: (node) => node.type === 'math',
        runner: (state, node, type) => {
            state.openNode(type);
            state.addText(node.value as string);
            state.closeNode();
        },
    };
    override serializer: NodeSerializerSpec = {
        match: (node) => node.type.name === this.id,
        runner: (state, node) => {
            let text = '';
            node.forEach((n) => {
                text += n.text as string;
            });
            state.addNode('math', undefined, text);
        },
    };
    override inputRules = (nodeType: NodeType): InputRule[] => [
        makeBlockMathInputRule(REGEX_BLOCK_MATH_DOLLARS, nodeType),
    ];
}

export const nodes = [new MathInline(), new MathDisplay()];
