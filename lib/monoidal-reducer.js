"use strict";

var MonoidalReducer = (function () {
  var MonoidalReducer = function MonoidalReducer(monoid) {
    this.identity = monoid.empty();
    var concat = monoid.prototype && monoid.prototype.concat || monoid.concat;
    this.append = this.append2 = function (a, b) {
      return concat.call(a, b);
    };
  };

  MonoidalReducer.prototype.fromNull = function (a) {
    return a == null ? this.identity : a;
  };

  MonoidalReducer.prototype.append3 = function (a, b, c) {
    return this.append(this.append(a, b), c);
  };

  MonoidalReducer.prototype.append4 = function (a, b, c, d) {
    return this.append(this.append3(a, b, c), d);
  };

  MonoidalReducer.prototype.fold = function (as, a) {
    var _this = this;
    return as.reduce(function (memo, x) {
      return _this.append(memo, x);
    }, a == null ? this.identity : a);
  };

  MonoidalReducer.prototype.reduceArrayExpression = function (node, elements) {
    return this.fold(elements.filter(function (x) {
      return x != null;
    }));
  };

  MonoidalReducer.prototype.reduceAssignmentExpression = function (node, binding, expression) {
    return this.append(binding, expression);
  };

  MonoidalReducer.prototype.reduceBinaryExpression = function (node, left, right) {
    return this.append(left, right);
  };

  MonoidalReducer.prototype.reduceBlock = function (node, statements) {
    return this.fold(statements);
  };

  MonoidalReducer.prototype.reduceBlockStatement = function (node, block) {
    return block;
  };

  MonoidalReducer.prototype.reduceBreakStatement = function (node, label) {
    return this.fromNull(label);
  };

  MonoidalReducer.prototype.reduceCallExpression = function (node, callee, args) {
    return this.fold(args, callee);
  };

  MonoidalReducer.prototype.reduceCatchClause = function (node, binding, body) {
    return this.append(binding, body);
  };

  MonoidalReducer.prototype.reduceComputedMemberExpression = function (node, object, expression) {
    return this.append(object, expression);
  };

  MonoidalReducer.prototype.reduceConditionalExpression = function (node, test, consequent, alternate) {
    return this.append3(test, consequent, alternate);
  };

  MonoidalReducer.prototype.reduceContinueStatement = function (node, label) {
    return this.fromNull(label);
  };

  MonoidalReducer.prototype.reduceDataProperty = function (node, name, expression) {
    return this.append(name, expression);
  };

  MonoidalReducer.prototype.reduceDebuggerStatement = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceDoWhileStatement = function (node, body, test) {
    return this.append(body, test);
  };

  MonoidalReducer.prototype.reduceEmptyStatement = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceExpressionStatement = function (node, expression) {
    return expression;
  };

  MonoidalReducer.prototype.reduceForInStatement = function (node, left, right, body) {
    return this.append3(left, right, body);
  };

  MonoidalReducer.prototype.reduceForStatement = function (node, init, test, update, body) {
    return this.append4(this.fromNull(init), this.fromNull(test), this.fromNull(update), body);
  };

  MonoidalReducer.prototype.reduceFunctionBody = function (node, directives, statements) {
    return this.append(this.fold(directives), this.fold(statements));
  };

  MonoidalReducer.prototype.reduceFunctionDeclaration = function (node, name, parameters, body) {
    return this.append(this.fold(parameters, name), body);
  };

  MonoidalReducer.prototype.reduceFunctionExpression = function (node, name, parameters, body) {
    return this.append(this.fold(parameters, this.fromNull(name)), body);
  };

  MonoidalReducer.prototype.reduceGetter = function (node, name, body) {
    return this.append(name, body);
  };

  MonoidalReducer.prototype.reduceIdentifier = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceIdentifierExpression = function (node, name) {
    return name;
  };

  MonoidalReducer.prototype.reduceIfStatement = function (node, test, consequent, alternate) {
    return this.append3(test, consequent, this.fromNull(alternate));
  };

  MonoidalReducer.prototype.reduceLabeledStatement = function (node, label, body) {
    return this.append(label, body);
  };

  MonoidalReducer.prototype.reduceLiteralBooleanExpression = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceLiteralNullExpression = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceLiteralNumericExpression = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceLiteralRegExpExpression = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceLiteralStringExpression = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceNewExpression = function (node, callee, args) {
    return this.fold(args, callee);
  };

  MonoidalReducer.prototype.reduceObjectExpression = function (node, properties) {
    return this.fold(properties);
  };

  MonoidalReducer.prototype.reducePostfixExpression = function (node, operand) {
    return operand;
  };

  MonoidalReducer.prototype.reducePrefixExpression = function (node, operand) {
    return operand;
  };

  MonoidalReducer.prototype.reducePropertyName = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceReturnStatement = function (node, expression) {
    return this.fromNull(expression);
  };

  MonoidalReducer.prototype.reduceScript = function (node, body) {
    return body;
  };

  MonoidalReducer.prototype.reduceSetter = function (node, name, parameter, body) {
    return this.append3(name, parameter, body);
  };

  MonoidalReducer.prototype.reduceStaticMemberExpression = function (node, object, property) {
    return this.append(object, property);
  };

  MonoidalReducer.prototype.reduceSwitchCase = function (node, test, consequent) {
    return this.fold(consequent, test);
  };

  MonoidalReducer.prototype.reduceSwitchDefault = function (node, consequent) {
    return this.fold(consequent);
  };

  MonoidalReducer.prototype.reduceSwitchStatement = function (node, discriminant, cases) {
    return this.fold(cases, discriminant);
  };

  MonoidalReducer.prototype.reduceSwitchStatementWithDefault = function (node, discriminant, preDefaultCases, defaultCase, postDefaultCases) {
    return this.append4(discriminant, this.fold(preDefaultCases), defaultCase, this.fold(postDefaultCases));
  };

  MonoidalReducer.prototype.reduceThisExpression = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceThrowStatement = function (node, expression) {
    return this.fromNull(expression);
  };

  MonoidalReducer.prototype.reduceTryCatchStatement = function (node, block, catchClause) {
    return this.append(block, catchClause);
  };

  MonoidalReducer.prototype.reduceTryFinallyStatement = function (node, block, catchClause, finalizer) {
    return this.append3(block, this.fromNull(catchClause), finalizer);
  };

  MonoidalReducer.prototype.reduceUnknownDirective = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceUseStrictDirective = function (node) {
    return this.identity;
  };

  MonoidalReducer.prototype.reduceVariableDeclaration = function (node, declarators) {
    return this.fold(declarators);
  };

  MonoidalReducer.prototype.reduceVariableDeclarationStatement = function (node, declaration) {
    return declaration;
  };

  MonoidalReducer.prototype.reduceVariableDeclarator = function (node, binding, init) {
    return this.append(binding, this.fromNull(init));
  };

  MonoidalReducer.prototype.reduceWhileStatement = function (node, test, body) {
    return this.append(test, body);
  };

  MonoidalReducer.prototype.reduceWithStatement = function (node, object, body) {
    return this.append(object, body);
  };

  return MonoidalReducer;
})();

exports["default"] = MonoidalReducer;
//# sourceMappingURL=data:application/json;base64,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QUFFO0FBQzNDLFdBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztHQUMvQjs7QUE1S2tCLGlCQUFlLFdBNktsQyxrQ0FBa0MsR0FBQSxVQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7QUFDcEQsV0FBTyxXQUFXLENBQUM7R0FDcEI7O0FBL0trQixpQkFBZSxXQWdMbEMsd0JBQXdCLEdBQUEsVUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtBQUM1QyxXQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztHQUNsRDs7QUFsTGtCLGlCQUFlLFdBbUxsQyxvQkFBb0IsR0FBQSxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3JDLFdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDaEM7O0FBckxrQixpQkFBZSxXQXNMbEMsbUJBQW1CLEdBQUEsVUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtBQUN0QyxXQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ2xDOztTQXhMa0IsZUFBZTs7O3FCQUFmLGVBQWUiLCJmaWxlIjoic3JjL21vbm9pZGFsLXJlZHVjZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE0IFNoYXBlIFNlY3VyaXR5LCBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKVxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9ub2lkYWxSZWR1Y2VyIHtcbiAgY29uc3RydWN0b3IobW9ub2lkKSB7XG4gICAgdGhpcy5pZGVudGl0eSA9IG1vbm9pZC5lbXB0eSgpO1xuICAgIGxldCBjb25jYXQgPSBtb25vaWQucHJvdG90eXBlICYmIG1vbm9pZC5wcm90b3R5cGUuY29uY2F0IHx8IG1vbm9pZC5jb25jYXQ7XG4gICAgdGhpcy5hcHBlbmQgPSB0aGlzLmFwcGVuZDIgPSAoYSwgYikgPT4gY29uY2F0LmNhbGwoYSwgYik7XG4gIH1cblxuICBmcm9tTnVsbChhKSB7XG4gICAgcmV0dXJuIGEgPT0gbnVsbCA/IHRoaXMuaWRlbnRpdHkgOiBhO1xuICB9XG4gIGFwcGVuZDMoYSwgYiwgYykge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZCh0aGlzLmFwcGVuZChhLCBiKSwgYyk7XG4gIH1cbiAgYXBwZW5kNChhLCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKHRoaXMuYXBwZW5kMyhhLCBiLCBjKSwgZCk7XG4gIH1cbiAgZm9sZChhcywgYSkge1xuICAgIHJldHVybiBhcy5yZWR1Y2UoKG1lbW8sIHgpID0+IHRoaXMuYXBwZW5kKG1lbW8sIHgpLCBhID09IG51bGwgPyB0aGlzLmlkZW50aXR5IDogYSk7XG4gIH1cblxuICByZWR1Y2VBcnJheUV4cHJlc3Npb24obm9kZSwgZWxlbWVudHMpIHtcbiAgICByZXR1cm4gdGhpcy5mb2xkKGVsZW1lbnRzLmZpbHRlcigoeCkgPT4geCAhPSBudWxsKSk7XG4gIH1cbiAgcmVkdWNlQXNzaWdubWVudEV4cHJlc3Npb24obm9kZSwgYmluZGluZywgZXhwcmVzc2lvbikge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZChiaW5kaW5nLCBleHByZXNzaW9uKTtcbiAgfVxuICByZWR1Y2VCaW5hcnlFeHByZXNzaW9uKG5vZGUsIGxlZnQsIHJpZ2h0KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKGxlZnQsIHJpZ2h0KTtcbiAgfVxuICByZWR1Y2VCbG9jayhub2RlLCBzdGF0ZW1lbnRzKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9sZChzdGF0ZW1lbnRzKTtcbiAgfVxuICByZWR1Y2VCbG9ja1N0YXRlbWVudChub2RlLCBibG9jaykge1xuICAgIHJldHVybiBibG9jaztcbiAgfVxuICByZWR1Y2VCcmVha1N0YXRlbWVudChub2RlLCBsYWJlbCkge1xuICAgIHJldHVybiB0aGlzLmZyb21OdWxsKGxhYmVsKTtcbiAgfVxuICByZWR1Y2VDYWxsRXhwcmVzc2lvbihub2RlLCBjYWxsZWUsIGFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5mb2xkKGFyZ3MsIGNhbGxlZSk7XG4gIH1cbiAgcmVkdWNlQ2F0Y2hDbGF1c2Uobm9kZSwgYmluZGluZywgYm9keSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZChiaW5kaW5nLCBib2R5KTtcbiAgfVxuICByZWR1Y2VDb21wdXRlZE1lbWJlckV4cHJlc3Npb24obm9kZSwgb2JqZWN0LCBleHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKG9iamVjdCwgZXhwcmVzc2lvbik7XG4gIH1cbiAgcmVkdWNlQ29uZGl0aW9uYWxFeHByZXNzaW9uKG5vZGUsIHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZDModGVzdCwgY29uc2VxdWVudCwgYWx0ZXJuYXRlKTtcbiAgfVxuICByZWR1Y2VDb250aW51ZVN0YXRlbWVudChub2RlLCBsYWJlbCkge1xuICAgIHJldHVybiB0aGlzLmZyb21OdWxsKGxhYmVsKTtcbiAgfVxuICByZWR1Y2VEYXRhUHJvcGVydHkobm9kZSwgbmFtZSwgZXhwcmVzc2lvbikge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZChuYW1lLCBleHByZXNzaW9uKTtcbiAgfVxuICByZWR1Y2VEZWJ1Z2dlclN0YXRlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlRG9XaGlsZVN0YXRlbWVudChub2RlLCBib2R5LCB0ZXN0KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKGJvZHksIHRlc3QpO1xuICB9XG4gIHJlZHVjZUVtcHR5U3RhdGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pZGVudGl0eTtcbiAgfVxuICByZWR1Y2VFeHByZXNzaW9uU3RhdGVtZW50KG5vZGUsIGV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbjtcbiAgfVxuICByZWR1Y2VGb3JJblN0YXRlbWVudChub2RlLCBsZWZ0LCByaWdodCwgYm9keSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZDMobGVmdCwgcmlnaHQsIGJvZHkpO1xuICB9XG4gIHJlZHVjZUZvclN0YXRlbWVudChub2RlLCBpbml0LCB0ZXN0LCB1cGRhdGUsIGJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQ0KHRoaXMuZnJvbU51bGwoaW5pdCksIHRoaXMuZnJvbU51bGwodGVzdCksIHRoaXMuZnJvbU51bGwodXBkYXRlKSwgYm9keSk7XG4gIH1cbiAgcmVkdWNlRnVuY3Rpb25Cb2R5KG5vZGUsIGRpcmVjdGl2ZXMsIHN0YXRlbWVudHMpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQodGhpcy5mb2xkKGRpcmVjdGl2ZXMpLCB0aGlzLmZvbGQoc3RhdGVtZW50cykpO1xuICB9XG4gIHJlZHVjZUZ1bmN0aW9uRGVjbGFyYXRpb24obm9kZSwgbmFtZSwgcGFyYW1ldGVycywgYm9keSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZCh0aGlzLmZvbGQocGFyYW1ldGVycywgbmFtZSksIGJvZHkpO1xuICB9XG4gIHJlZHVjZUZ1bmN0aW9uRXhwcmVzc2lvbihub2RlLCBuYW1lLCBwYXJhbWV0ZXJzLCBib2R5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKHRoaXMuZm9sZChwYXJhbWV0ZXJzLCB0aGlzLmZyb21OdWxsKG5hbWUpKSwgYm9keSk7XG4gIH1cbiAgcmVkdWNlR2V0dGVyKG5vZGUsIG5hbWUsIGJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQobmFtZSwgYm9keSk7XG4gIH1cbiAgcmVkdWNlSWRlbnRpZmllcihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlSWRlbnRpZmllckV4cHJlc3Npb24obm9kZSwgbmFtZSkge1xuICAgIHJldHVybiBuYW1lO1xuICB9XG4gIHJlZHVjZUlmU3RhdGVtZW50KG5vZGUsIHRlc3QsIGNvbnNlcXVlbnQsIGFsdGVybmF0ZSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZDModGVzdCwgY29uc2VxdWVudCwgdGhpcy5mcm9tTnVsbChhbHRlcm5hdGUpKTtcbiAgfVxuICByZWR1Y2VMYWJlbGVkU3RhdGVtZW50KG5vZGUsIGxhYmVsLCBib2R5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKGxhYmVsLCBib2R5KTtcbiAgfVxuICByZWR1Y2VMaXRlcmFsQm9vbGVhbkV4cHJlc3Npb24obm9kZSkge1xuICAgIHJldHVybiB0aGlzLmlkZW50aXR5O1xuICB9XG4gIHJlZHVjZUxpdGVyYWxOdWxsRXhwcmVzc2lvbihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlTGl0ZXJhbE51bWVyaWNFeHByZXNzaW9uKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pZGVudGl0eTtcbiAgfVxuICByZWR1Y2VMaXRlcmFsUmVnRXhwRXhwcmVzc2lvbihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlTGl0ZXJhbFN0cmluZ0V4cHJlc3Npb24obm9kZSkge1xuICAgIHJldHVybiB0aGlzLmlkZW50aXR5O1xuICB9XG4gIHJlZHVjZU5ld0V4cHJlc3Npb24obm9kZSwgY2FsbGVlLCBhcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9sZChhcmdzLCBjYWxsZWUpO1xuICB9XG4gIHJlZHVjZU9iamVjdEV4cHJlc3Npb24obm9kZSwgcHJvcGVydGllcykge1xuICAgIHJldHVybiB0aGlzLmZvbGQocHJvcGVydGllcyk7XG4gIH1cbiAgcmVkdWNlUG9zdGZpeEV4cHJlc3Npb24obm9kZSwgb3BlcmFuZCkge1xuICAgIHJldHVybiBvcGVyYW5kO1xuICB9XG4gIHJlZHVjZVByZWZpeEV4cHJlc3Npb24obm9kZSwgb3BlcmFuZCkge1xuICAgIHJldHVybiBvcGVyYW5kO1xuICB9XG4gIHJlZHVjZVByb3BlcnR5TmFtZShub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlUmV0dXJuU3RhdGVtZW50KG5vZGUsIGV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gdGhpcy5mcm9tTnVsbChleHByZXNzaW9uKTtcbiAgfVxuICByZWR1Y2VTY3JpcHQobm9kZSwgYm9keSkge1xuICAgIHJldHVybiBib2R5O1xuICB9XG4gIHJlZHVjZVNldHRlcihub2RlLCBuYW1lLCBwYXJhbWV0ZXIsIGJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQzKG5hbWUsIHBhcmFtZXRlciwgYm9keSk7XG4gIH1cbiAgcmVkdWNlU3RhdGljTWVtYmVyRXhwcmVzc2lvbihub2RlLCBvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKG9iamVjdCwgcHJvcGVydHkpO1xuICB9XG4gIHJlZHVjZVN3aXRjaENhc2Uobm9kZSwgdGVzdCwgY29uc2VxdWVudCkge1xuICAgIHJldHVybiB0aGlzLmZvbGQoY29uc2VxdWVudCwgdGVzdCk7XG4gIH1cbiAgcmVkdWNlU3dpdGNoRGVmYXVsdChub2RlLCBjb25zZXF1ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuZm9sZChjb25zZXF1ZW50KTtcbiAgfVxuICByZWR1Y2VTd2l0Y2hTdGF0ZW1lbnQobm9kZSwgZGlzY3JpbWluYW50LCBjYXNlcykge1xuICAgIHJldHVybiB0aGlzLmZvbGQoY2FzZXMsIGRpc2NyaW1pbmFudCk7XG4gIH1cbiAgcmVkdWNlU3dpdGNoU3RhdGVtZW50V2l0aERlZmF1bHQobm9kZSwgZGlzY3JpbWluYW50LCBwcmVEZWZhdWx0Q2FzZXMsIGRlZmF1bHRDYXNlLCBwb3N0RGVmYXVsdENhc2VzKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kNChkaXNjcmltaW5hbnQsIHRoaXMuZm9sZChwcmVEZWZhdWx0Q2FzZXMpLCBkZWZhdWx0Q2FzZSwgdGhpcy5mb2xkKHBvc3REZWZhdWx0Q2FzZXMpKTtcbiAgfVxuICByZWR1Y2VUaGlzRXhwcmVzc2lvbihub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHk7XG4gIH1cbiAgcmVkdWNlVGhyb3dTdGF0ZW1lbnQobm9kZSwgZXhwcmVzc2lvbikge1xuICAgIHJldHVybiB0aGlzLmZyb21OdWxsKGV4cHJlc3Npb24pO1xuICB9XG4gIHJlZHVjZVRyeUNhdGNoU3RhdGVtZW50KG5vZGUsIGJsb2NrLCBjYXRjaENsYXVzZSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZChibG9jaywgY2F0Y2hDbGF1c2UpO1xuICB9XG4gIHJlZHVjZVRyeUZpbmFsbHlTdGF0ZW1lbnQobm9kZSwgYmxvY2ssIGNhdGNoQ2xhdXNlLCBmaW5hbGl6ZXIpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQzKGJsb2NrLCB0aGlzLmZyb21OdWxsKGNhdGNoQ2xhdXNlKSwgZmluYWxpemVyKTtcbiAgfVxuICByZWR1Y2VVbmtub3duRGlyZWN0aXZlKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pZGVudGl0eTtcbiAgfVxuICByZWR1Y2VVc2VTdHJpY3REaXJlY3RpdmUobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmlkZW50aXR5O1xuICB9XG4gIHJlZHVjZVZhcmlhYmxlRGVjbGFyYXRpb24obm9kZSwgZGVjbGFyYXRvcnMpIHtcbiAgICByZXR1cm4gdGhpcy5mb2xkKGRlY2xhcmF0b3JzKTtcbiAgfVxuICByZWR1Y2VWYXJpYWJsZURlY2xhcmF0aW9uU3RhdGVtZW50KG5vZGUsIGRlY2xhcmF0aW9uKSB7XG4gICAgcmV0dXJuIGRlY2xhcmF0aW9uO1xuICB9XG4gIHJlZHVjZVZhcmlhYmxlRGVjbGFyYXRvcihub2RlLCBiaW5kaW5nLCBpbml0KSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kKGJpbmRpbmcsIHRoaXMuZnJvbU51bGwoaW5pdCkpO1xuICB9XG4gIHJlZHVjZVdoaWxlU3RhdGVtZW50KG5vZGUsIHRlc3QsIGJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQodGVzdCwgYm9keSk7XG4gIH1cbiAgcmVkdWNlV2l0aFN0YXRlbWVudChub2RlLCBvYmplY3QsIGJvZHkpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmQob2JqZWN0LCBib2R5KTtcbiAgfVxufVxuIl19