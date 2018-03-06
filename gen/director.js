/**
 * Copyright 2016 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const director = {
  ArrayAssignmentTarget(reducer, node) {
    return reducer.reduceArrayAssignmentTarget(node, { elements: node.elements.map(v => v && this[v.type](reducer, v)), rest: node.rest && this[node.rest.type](reducer, node.rest) });
  },

  ArrayBinding(reducer, node) {
    return reducer.reduceArrayBinding(node, { elements: node.elements.map(v => v && this[v.type](reducer, v)), rest: node.rest && this[node.rest.type](reducer, node.rest) });
  },

  ArrayExpression(reducer, node) {
    return reducer.reduceArrayExpression(node, { elements: node.elements.map(v => v && this[v.type](reducer, v)) });
  },

  ArrowExpression(reducer, node) {
    return reducer.reduceArrowExpression(node, { params: this.FormalParameters(reducer, node.params), body: this[node.body.type](reducer, node.body) });
  },

  AssignmentExpression(reducer, node) {
    return reducer.reduceAssignmentExpression(node, { binding: this[node.binding.type](reducer, node.binding), expression: this[node.expression.type](reducer, node.expression) });
  },

  AssignmentTargetIdentifier(reducer, node) {
    return reducer.reduceAssignmentTargetIdentifier(node);
  },

  AssignmentTargetPropertyIdentifier(reducer, node) {
    return reducer.reduceAssignmentTargetPropertyIdentifier(node, { binding: this.AssignmentTargetIdentifier(reducer, node.binding), init: node.init && this[node.init.type](reducer, node.init) });
  },

  AssignmentTargetPropertyProperty(reducer, node) {
    return reducer.reduceAssignmentTargetPropertyProperty(node, { name: this[node.name.type](reducer, node.name), binding: this[node.binding.type](reducer, node.binding) });
  },

  AssignmentTargetWithDefault(reducer, node) {
    return reducer.reduceAssignmentTargetWithDefault(node, { binding: this[node.binding.type](reducer, node.binding), init: this[node.init.type](reducer, node.init) });
  },

  BinaryExpression(reducer, node) {
    return reducer.reduceBinaryExpression(node, { left: this[node.left.type](reducer, node.left), right: this[node.right.type](reducer, node.right) });
  },

  BindingIdentifier(reducer, node) {
    return reducer.reduceBindingIdentifier(node);
  },

  BindingPropertyIdentifier(reducer, node) {
    return reducer.reduceBindingPropertyIdentifier(node, { binding: this.BindingIdentifier(reducer, node.binding), init: node.init && this[node.init.type](reducer, node.init) });
  },

  BindingPropertyProperty(reducer, node) {
    return reducer.reduceBindingPropertyProperty(node, { name: this[node.name.type](reducer, node.name), binding: this[node.binding.type](reducer, node.binding) });
  },

  BindingWithDefault(reducer, node) {
    return reducer.reduceBindingWithDefault(node, { binding: this[node.binding.type](reducer, node.binding), init: this[node.init.type](reducer, node.init) });
  },

  Block(reducer, node) {
    return reducer.reduceBlock(node, { statements: node.statements.map(v => this[v.type](reducer, v)) });
  },

  BlockStatement(reducer, node) {
    return reducer.reduceBlockStatement(node, { block: this.Block(reducer, node.block) });
  },

  BreakStatement(reducer, node) {
    return reducer.reduceBreakStatement(node);
  },

  CallExpression(reducer, node) {
    return reducer.reduceCallExpression(node, { callee: this[node.callee.type](reducer, node.callee), arguments: node.arguments.map(v => this[v.type](reducer, v)) });
  },

  CatchClause(reducer, node) {
    return reducer.reduceCatchClause(node, { binding: this[node.binding.type](reducer, node.binding), body: this.Block(reducer, node.body) });
  },

  ClassDeclaration(reducer, node) {
    return reducer.reduceClassDeclaration(node, { name: this.BindingIdentifier(reducer, node.name), super: node.super && this[node.super.type](reducer, node.super), elements: node.elements.map(v => this.ClassElement(reducer, v)) });
  },

  ClassElement(reducer, node) {
    return reducer.reduceClassElement(node, { method: this[node.method.type](reducer, node.method) });
  },

  ClassExpression(reducer, node) {
    return reducer.reduceClassExpression(node, { name: node.name && this.BindingIdentifier(reducer, node.name), super: node.super && this[node.super.type](reducer, node.super), elements: node.elements.map(v => this.ClassElement(reducer, v)) });
  },

  CompoundAssignmentExpression(reducer, node) {
    return reducer.reduceCompoundAssignmentExpression(node, { binding: this[node.binding.type](reducer, node.binding), expression: this[node.expression.type](reducer, node.expression) });
  },

  ComputedMemberAssignmentTarget(reducer, node) {
    return reducer.reduceComputedMemberAssignmentTarget(node, { object: this[node.object.type](reducer, node.object), expression: this[node.expression.type](reducer, node.expression) });
  },

  ComputedMemberExpression(reducer, node) {
    return reducer.reduceComputedMemberExpression(node, { object: this[node.object.type](reducer, node.object), expression: this[node.expression.type](reducer, node.expression) });
  },

  ComputedPropertyName(reducer, node) {
    return reducer.reduceComputedPropertyName(node, { expression: this[node.expression.type](reducer, node.expression) });
  },

  ConditionalExpression(reducer, node) {
    return reducer.reduceConditionalExpression(node, { test: this[node.test.type](reducer, node.test), consequent: this[node.consequent.type](reducer, node.consequent), alternate: this[node.alternate.type](reducer, node.alternate) });
  },

  ContinueStatement(reducer, node) {
    return reducer.reduceContinueStatement(node);
  },

  DataProperty(reducer, node) {
    return reducer.reduceDataProperty(node, { name: this[node.name.type](reducer, node.name), expression: this[node.expression.type](reducer, node.expression) });
  },

  DebuggerStatement(reducer, node) {
    return reducer.reduceDebuggerStatement(node);
  },

  Directive(reducer, node) {
    return reducer.reduceDirective(node);
  },

  DoWhileStatement(reducer, node) {
    return reducer.reduceDoWhileStatement(node, { body: this[node.body.type](reducer, node.body), test: this[node.test.type](reducer, node.test) });
  },

  EmptyStatement(reducer, node) {
    return reducer.reduceEmptyStatement(node);
  },

  Export(reducer, node) {
    return reducer.reduceExport(node, { declaration: this[node.declaration.type](reducer, node.declaration) });
  },

  ExportAllFrom(reducer, node) {
    return reducer.reduceExportAllFrom(node);
  },

  ExportDefault(reducer, node) {
    return reducer.reduceExportDefault(node, { body: this[node.body.type](reducer, node.body) });
  },

  ExportFrom(reducer, node) {
    return reducer.reduceExportFrom(node, { namedExports: node.namedExports.map(v => this.ExportFromSpecifier(reducer, v)) });
  },

  ExportFromSpecifier(reducer, node) {
    return reducer.reduceExportFromSpecifier(node);
  },

  ExportLocalSpecifier(reducer, node) {
    return reducer.reduceExportLocalSpecifier(node, { name: this.IdentifierExpression(reducer, node.name) });
  },

  ExportLocals(reducer, node) {
    return reducer.reduceExportLocals(node, { namedExports: node.namedExports.map(v => this.ExportLocalSpecifier(reducer, v)) });
  },

  ExpressionStatement(reducer, node) {
    return reducer.reduceExpressionStatement(node, { expression: this[node.expression.type](reducer, node.expression) });
  },

  ForInStatement(reducer, node) {
    return reducer.reduceForInStatement(node, { left: this[node.left.type](reducer, node.left), right: this[node.right.type](reducer, node.right), body: this[node.body.type](reducer, node.body) });
  },

  ForOfStatement(reducer, node) {
    return reducer.reduceForOfStatement(node, { left: this[node.left.type](reducer, node.left), right: this[node.right.type](reducer, node.right), body: this[node.body.type](reducer, node.body) });
  },

  ForStatement(reducer, node) {
    return reducer.reduceForStatement(node, { init: node.init && this[node.init.type](reducer, node.init), test: node.test && this[node.test.type](reducer, node.test), update: node.update && this[node.update.type](reducer, node.update), body: this[node.body.type](reducer, node.body) });
  },

  FormalParameters(reducer, node) {
    return reducer.reduceFormalParameters(node, { items: node.items.map(v => this[v.type](reducer, v)), rest: node.rest && this[node.rest.type](reducer, node.rest) });
  },

  FunctionBody(reducer, node) {
    return reducer.reduceFunctionBody(node, { directives: node.directives.map(v => this.Directive(reducer, v)), statements: node.statements.map(v => this[v.type](reducer, v)) });
  },

  FunctionDeclaration(reducer, node) {
    return reducer.reduceFunctionDeclaration(node, { name: this.BindingIdentifier(reducer, node.name), params: this.FormalParameters(reducer, node.params), body: this.FunctionBody(reducer, node.body) });
  },

  FunctionExpression(reducer, node) {
    return reducer.reduceFunctionExpression(node, { name: node.name && this.BindingIdentifier(reducer, node.name), params: this.FormalParameters(reducer, node.params), body: this.FunctionBody(reducer, node.body) });
  },

  Getter(reducer, node) {
    return reducer.reduceGetter(node, { name: this[node.name.type](reducer, node.name), body: this.FunctionBody(reducer, node.body) });
  },

  IdentifierExpression(reducer, node) {
    return reducer.reduceIdentifierExpression(node);
  },

  IfStatement(reducer, node) {
    return reducer.reduceIfStatement(node, { test: this[node.test.type](reducer, node.test), consequent: this[node.consequent.type](reducer, node.consequent), alternate: node.alternate && this[node.alternate.type](reducer, node.alternate) });
  },

  Import(reducer, node) {
    return reducer.reduceImport(node, { defaultBinding: node.defaultBinding && this.BindingIdentifier(reducer, node.defaultBinding), namedImports: node.namedImports.map(v => this.ImportSpecifier(reducer, v)) });
  },

  ImportNamespace(reducer, node) {
    return reducer.reduceImportNamespace(node, { defaultBinding: node.defaultBinding && this.BindingIdentifier(reducer, node.defaultBinding), namespaceBinding: this.BindingIdentifier(reducer, node.namespaceBinding) });
  },

  ImportSpecifier(reducer, node) {
    return reducer.reduceImportSpecifier(node, { binding: this.BindingIdentifier(reducer, node.binding) });
  },

  LabeledStatement(reducer, node) {
    return reducer.reduceLabeledStatement(node, { body: this[node.body.type](reducer, node.body) });
  },

  LiteralBooleanExpression(reducer, node) {
    return reducer.reduceLiteralBooleanExpression(node);
  },

  LiteralInfinityExpression(reducer, node) {
    return reducer.reduceLiteralInfinityExpression(node);
  },

  LiteralNullExpression(reducer, node) {
    return reducer.reduceLiteralNullExpression(node);
  },

  LiteralNumericExpression(reducer, node) {
    return reducer.reduceLiteralNumericExpression(node);
  },

  LiteralRegExpExpression(reducer, node) {
    return reducer.reduceLiteralRegExpExpression(node);
  },

  LiteralStringExpression(reducer, node) {
    return reducer.reduceLiteralStringExpression(node);
  },

  Method(reducer, node) {
    return reducer.reduceMethod(node, { name: this[node.name.type](reducer, node.name), params: this.FormalParameters(reducer, node.params), body: this.FunctionBody(reducer, node.body) });
  },

  Module(reducer, node) {
    return reducer.reduceModule(node, { directives: node.directives.map(v => this.Directive(reducer, v)), items: node.items.map(v => this[v.type](reducer, v)) });
  },

  NewExpression(reducer, node) {
    return reducer.reduceNewExpression(node, { callee: this[node.callee.type](reducer, node.callee), arguments: node.arguments.map(v => this[v.type](reducer, v)) });
  },

  NewTargetExpression(reducer, node) {
    return reducer.reduceNewTargetExpression(node);
  },

  ObjectAssignmentTarget(reducer, node) {
    return reducer.reduceObjectAssignmentTarget(node, { properties: node.properties.map(v => this[v.type](reducer, v)) });
  },

  ObjectBinding(reducer, node) {
    return reducer.reduceObjectBinding(node, { properties: node.properties.map(v => this[v.type](reducer, v)) });
  },

  ObjectExpression(reducer, node) {
    return reducer.reduceObjectExpression(node, { properties: node.properties.map(v => this[v.type](reducer, v)) });
  },

  ReturnStatement(reducer, node) {
    return reducer.reduceReturnStatement(node, { expression: node.expression && this[node.expression.type](reducer, node.expression) });
  },

  Script(reducer, node) {
    return reducer.reduceScript(node, { directives: node.directives.map(v => this.Directive(reducer, v)), statements: node.statements.map(v => this[v.type](reducer, v)) });
  },

  Setter(reducer, node) {
    return reducer.reduceSetter(node, { name: this[node.name.type](reducer, node.name), param: this[node.param.type](reducer, node.param), body: this.FunctionBody(reducer, node.body) });
  },

  ShorthandProperty(reducer, node) {
    return reducer.reduceShorthandProperty(node, { name: this.IdentifierExpression(reducer, node.name) });
  },

  SpreadElement(reducer, node) {
    return reducer.reduceSpreadElement(node, { expression: this[node.expression.type](reducer, node.expression) });
  },

  StaticMemberAssignmentTarget(reducer, node) {
    return reducer.reduceStaticMemberAssignmentTarget(node, { object: this[node.object.type](reducer, node.object) });
  },

  StaticMemberExpression(reducer, node) {
    return reducer.reduceStaticMemberExpression(node, { object: this[node.object.type](reducer, node.object) });
  },

  StaticPropertyName(reducer, node) {
    return reducer.reduceStaticPropertyName(node);
  },

  Super(reducer, node) {
    return reducer.reduceSuper(node);
  },

  SwitchCase(reducer, node) {
    return reducer.reduceSwitchCase(node, { test: this[node.test.type](reducer, node.test), consequent: node.consequent.map(v => this[v.type](reducer, v)) });
  },

  SwitchDefault(reducer, node) {
    return reducer.reduceSwitchDefault(node, { consequent: node.consequent.map(v => this[v.type](reducer, v)) });
  },

  SwitchStatement(reducer, node) {
    return reducer.reduceSwitchStatement(node, { discriminant: this[node.discriminant.type](reducer, node.discriminant), cases: node.cases.map(v => this.SwitchCase(reducer, v)) });
  },

  SwitchStatementWithDefault(reducer, node) {
    return reducer.reduceSwitchStatementWithDefault(node, { discriminant: this[node.discriminant.type](reducer, node.discriminant), preDefaultCases: node.preDefaultCases.map(v => this.SwitchCase(reducer, v)), defaultCase: this.SwitchDefault(reducer, node.defaultCase), postDefaultCases: node.postDefaultCases.map(v => this.SwitchCase(reducer, v)) });
  },

  TemplateElement(reducer, node) {
    return reducer.reduceTemplateElement(node);
  },

  TemplateExpression(reducer, node) {
    return reducer.reduceTemplateExpression(node, { tag: node.tag && this[node.tag.type](reducer, node.tag), elements: node.elements.map(v => this[v.type](reducer, v)) });
  },

  ThisExpression(reducer, node) {
    return reducer.reduceThisExpression(node);
  },

  ThrowStatement(reducer, node) {
    return reducer.reduceThrowStatement(node, { expression: this[node.expression.type](reducer, node.expression) });
  },

  TryCatchStatement(reducer, node) {
    return reducer.reduceTryCatchStatement(node, { body: this.Block(reducer, node.body), catchClause: this.CatchClause(reducer, node.catchClause) });
  },

  TryFinallyStatement(reducer, node) {
    return reducer.reduceTryFinallyStatement(node, { body: this.Block(reducer, node.body), catchClause: node.catchClause && this.CatchClause(reducer, node.catchClause), finalizer: this.Block(reducer, node.finalizer) });
  },

  UnaryExpression(reducer, node) {
    return reducer.reduceUnaryExpression(node, { operand: this[node.operand.type](reducer, node.operand) });
  },

  UpdateExpression(reducer, node) {
    return reducer.reduceUpdateExpression(node, { operand: this[node.operand.type](reducer, node.operand) });
  },

  VariableDeclaration(reducer, node) {
    return reducer.reduceVariableDeclaration(node, { declarators: node.declarators.map(v => this.VariableDeclarator(reducer, v)) });
  },

  VariableDeclarationStatement(reducer, node) {
    return reducer.reduceVariableDeclarationStatement(node, { declaration: this.VariableDeclaration(reducer, node.declaration) });
  },

  VariableDeclarator(reducer, node) {
    return reducer.reduceVariableDeclarator(node, { binding: this[node.binding.type](reducer, node.binding), init: node.init && this[node.init.type](reducer, node.init) });
  },

  WhileStatement(reducer, node) {
    return reducer.reduceWhileStatement(node, { test: this[node.test.type](reducer, node.test), body: this[node.body.type](reducer, node.body) });
  },

  WithStatement(reducer, node) {
    return reducer.reduceWithStatement(node, { object: this[node.object.type](reducer, node.object), body: this[node.body.type](reducer, node.body) });
  },

  YieldExpression(reducer, node) {
    return reducer.reduceYieldExpression(node, { expression: node.expression && this[node.expression.type](reducer, node.expression) });
  },

  YieldGeneratorExpression(reducer, node) {
    return reducer.reduceYieldGeneratorExpression(node, { expression: this[node.expression.type](reducer, node.expression) });
  },
};

export function reduce(reducer, node) {
  return director[node.type](reducer, node);
}